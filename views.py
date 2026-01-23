from flask import Blueprint, render_template, request, flash, jsonify
from flask_login import login_required, current_user
from .models import Note, Expense
from . import db
import json
from datetime import datetime

views = Blueprint('views', __name__)


@views.route('/', methods=['GET'])
def landing():
    return render_template("landingpage.html")


@views.route('/home', methods=['GET', 'POST'])
@login_required
def home():
    if request.method == 'POST': 
        note = request.form.get('note')#Gets the note from the HTML 

        if len(note) < 1:
            flash('Note is too short!', category='error') 
        else:
            new_note = Note(data=note, user_id=current_user.id)  #providing the schema for the note 
            db.session.add(new_note) #adding the note to the database 
            db.session.commit()
            flash('Note added!', category='success')

    return render_template("home.html", user=current_user)


@views.route('/dashboard', methods=['GET'])
@login_required
def dashboard():
    # Get all expenses for the current user
    expenses = Expense.query.filter_by(user_id=current_user.id).order_by(Expense.date.desc()).all()
    
    # Calculate totals
    total_income = sum(e.amount for e in expenses if e.type == 'Income')
    total_expense = sum(e.amount for e in expenses if e.type == 'Expense')
    total_balance = total_income - total_expense
    
    return render_template("dashboard.html", 
                         user=current_user,
                         expenses=expenses,
                         total_income=total_income,
                         total_expense=total_expense,
                         total_balance=total_balance)


@views.route('/add-expense', methods=['POST'])
@login_required
def add_expense():
    try:
        amount = request.form.get('amount')
        category = request.form.get('category')
        expense_type = request.form.get('type')
        payment_mode = request.form.get('paymentMode')
        description = request.form.get('description')
        
        if not amount or not category or not expense_type:
            flash('Please fill in all required fields!', category='error')
            return jsonify({'success': False})
        
        try:
            amount = float(amount)
            if amount <= 0:
                flash('Amount must be greater than 0!', category='error')
                return jsonify({'success': False})
        except ValueError:
            flash('Invalid amount!', category='error')
            return jsonify({'success': False})
        
        new_expense = Expense(
            amount=amount,
            category=category,
            type=expense_type,
            description=description,
            payment_mode=payment_mode,
            user_id=current_user.id
        )
        
        db.session.add(new_expense)
        db.session.commit()
        flash('Expense added successfully!', category='success')
        return jsonify({'success': True})
    
    except Exception as e:
        db.session.rollback()
        flash(f'Error adding expense: {str(e)}', category='error')
        return jsonify({'success': False})


@views.route('/delete-expense/<int:expense_id>', methods=['POST'])
@login_required
def delete_expense(expense_id):
    expense = Expense.query.get(expense_id)
    
    if expense:
        if expense.user_id == current_user.id:
            db.session.delete(expense)
            db.session.commit()
            flash('Expense deleted!', category='error')
            return jsonify({'success': True})
        else:
            flash('Unauthorized!', category='error')
            return jsonify({'success': False})
    
    flash('Expense not found!', category='error')
    return jsonify({'success': False})


@views.route('/delete-note', methods=['POST'])
def delete_note():  
    note = json.loads(request.data) # this function expects a JSON from the INDEX.js file 
    noteId = note['noteId']
    note = Note.query.get(noteId)
    if note:
        if note.user_id == current_user.id:
            db.session.delete(note)
            db.session.commit()

    return jsonify({})
