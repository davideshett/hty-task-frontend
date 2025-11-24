# Event Management Booking System

A full-stack event management solution with CRM integration built with .NET backend and modern frontend technologies.

## 🚀 Overview

This system enables users to browse events and make bookings through a web interface. When a booking is created, the system automatically generates a contact in MemberBase CRM while maintaining all records in a SQL Server database.

## 🏗️ Architecture

### Frontend
- **HTML5** - Semantic markup structure
- **CSS3** - Responsive styling and layouts
- **JavaScript** - Client-side interactivity and API communication

### Backend
- **C# .NET** - Robust API and business logic
- **SQL Server** - Data persistence and management
- **Service Layer Pattern** - Clean separation of concerns

## 📊 Database Schema

### Core Tables
- **Events** - Event details, dates, and capacity information
- **Users** - User accounts and profile data
- **Bookings** - Event registration records and relationships

## 🔄 Booking Workflow
Frontend Form → .NET API → Database Storage → MemberBase API → Booking Confirmation


### Process Flow
1. User submits booking form with name, email, and event selection
2. Frontend sends POST request to backend API
3. Backend processes request through service layer
4. System creates booking record in SQL Server
5. Contact details sent to MemberBase CRM API
6. Comprehensive logging throughout the process
7. Success/error response returned to user

### Key Features
1. CRM Integration: Automatic contact creation in MemberBase
2. Comprehensive Logging: Detailed audit trails and monitoring
3. Error Handling: Robust exception management and retry logic
4. Data Consistency: Transaction management across operations
