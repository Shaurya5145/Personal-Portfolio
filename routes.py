from flask import render_template, request, flash, redirect, url_for, send_from_directory
from flask_mail import Message
from app import app, db, mail
from models import ContactMessage
import logging
import os

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/robots.txt')
def robots_txt():
    return send_from_directory(os.getcwd(), 'robots.txt')

@app.route('/contact', methods=['POST'])
def contact():
    try:
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        message_text = request.form.get('message', '').strip()
        
        # Validation
        if not name or not email or not message_text:
            flash('All fields are required.', 'error')
            return redirect(url_for('index') + '#contact')
        
        if len(name) < 2:
            flash('Name must be at least 2 characters long.', 'error')
            return redirect(url_for('index') + '#contact')
        
        if '@' not in email or '.' not in email:
            flash('Please enter a valid email address.', 'error')
            return redirect(url_for('index') + '#contact')
        
        if len(message_text) < 10:
            flash('Message must be at least 10 characters long.', 'error')
            return redirect(url_for('index') + '#contact')
        
        # Save to database
        contact_message = ContactMessage(
            name=name,
            email=email,
            message=message_text
        )
        db.session.add(contact_message)
        db.session.commit()
        
        # Send email notification (if configured)
        try:
            if app.config['MAIL_USERNAME']:
                msg = Message(
                    subject=f'Portfolio Contact: {name}',
                    recipients=[app.config['MAIL_USERNAME']],
                    body=f'''
New contact form submission:

Name: {name}
Email: {email}
Message: {message_text}

Sent from: Portfolio Website
                    '''
                )
                mail.send(msg)
                logging.info(f'Email sent successfully for contact from {email}')
        except Exception as e:
            logging.error(f'Failed to send email: {str(e)}')
            # Continue anyway - we still saved to database
        
        flash('Thank you for your message! I\'ll get back to you soon.', 'success')
        return redirect(url_for('index') + '#contact')
        
    except Exception as e:
        logging.error(f'Contact form error: {str(e)}')
        flash('Something went wrong. Please try again later.', 'error')
        return redirect(url_for('index') + '#contact')

@app.errorhandler(404)
def not_found(error):
    return render_template('index.html'), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return render_template('index.html'), 500
