import React, { useState } from 'react';
import '../css/Payments.css';

const PAYMENT_METHODS = [
  { id: 'mpesa', name: 'M-PESA', icon: '📱' },
  { id: 'bankTransfer', name: 'Bank Transfer', icon: '🏦' }
];

const INITIAL_TRANSACTIONS = [
  {
    id: 1,
    date: '2024-01-15',
    amount: 250.50,
    method: 'M-PESA',
    status: 'Paid'
  },
  {
    id: 2,
    date: '2024-02-20',
    amount: 150.75,
    method: 'Bank Transfer',
    status: 'Pending'
  }
];

function PaymentSystem() {
  const [activeTab, setActiveTab] = useState('make-payment');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bankDetails, setBankDetails] = useState({
    accountName: '',
    accountNumber: '',
    bankName: ''
  });
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [paymentStep, setPaymentStep] = useState(0);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: transactions.length + 1,
      date: new Date().toISOString().split('T')[0],
      amount: parseFloat(amount),
      method: paymentMethod === 'mpesa' ? 'M-PESA' : 'Bank Transfer',
      status: 'Paid'
    };
    setTransactions([newTransaction, ...transactions]);
    setPaymentStep(2);
  };

  const exportTransactions = (format) => {
    alert('Exporting transactions as ${format.toUpperCase()}');
  };

  const renderPaymentMethodForm = () => {
    if (paymentMethod === 'mpesa') {
      return (
        <div className="payment-method-details">
          <div className="form-group">
            <label>M-PESA Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter M-PESA phone number"
              required
            />
          </div>
        </div>
      );
    } else if (paymentMethod === 'bankTransfer') {
      return (
        <div className="payment-method-details">
          <div className="form-group">
            <label>Account Name</label>
            <input
              type="text"
              value={bankDetails.accountName}
              onChange={(e) => setBankDetails({
                ...bankDetails, 
                accountName: e.target.value
              })}
              placeholder="Enter account name"
              required
            />
          </div>
          <div className="form-group">
            <label>Account Number</label>
            <input
              type="text"
              value={bankDetails.accountNumber}
              onChange={(e) => setBankDetails({
                ...bankDetails, 
                accountNumber: e.target.value
              })}
              placeholder="Enter account number"
              required
            />
          </div>
          <div className="form-group">
            <label>Bank Name</label>
            <input
              type="text"
              value={bankDetails.bankName}
              onChange={(e) => setBankDetails({
                ...bankDetails, 
                bankName: e.target.value
              })}
              placeholder="Enter bank name"
              required
            />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="payment-system">
      <div>
          <h2 className='h2'>Payment Portal</h2>
        <nav className='nav'>
          <button 
            onClick={() => {
              setActiveTab('make-payment');
              setPaymentStep(0);
            }}
            className={activeTab === 'make-payment' ? 'active' : ''}
          >
            Make Payment
          </button>
          <button 
            onClick={() => setActiveTab('payment-history')}
            className={activeTab === 'payment-history' ? 'active' : ''}
          >
            Payment History
          </button>
        </nav>
      </div>

      <div className="content">
        {activeTab === 'make-payment' && (
          <div className="payment-section">
            <h2>Make Payment</h2>
            
            <div className="progress-bar">
              <div 
                className="progress" 
                style={{ width: '${(paymentStep + 1) * 33.33}%' }}
              />
            </div>

            {paymentStep === 0 && (
              <div className="payment-methods">
                {PAYMENT_METHODS.map(method => (
                  <button
                    key={method.id}
                    onClick={() => {
                      setPaymentMethod(method.id);
                      setPaymentStep(1);
                    }}
                    className={paymentMethod === method.id ? 'selected' : ''}
                  >
                    <span className="method-icon">{method.icon}</span>
                    <p>{method.name}</p>
                  </button>
                ))}
              </div>
            )}

            {paymentStep === 1 && (
              <form onSubmit={handlePaymentSubmit} className="payment-form">
                <div className="form-group">
                  <label>Payment Amount</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    required
                  />
                </div>

                {renderPaymentMethodForm()}

                <div className="form-actions">
                  <button 
                    type="button"
                    onClick={() => setPaymentStep(0)}
                    className="btn-secondary"
                  >
                    Back
                  </button>
                  <button 
                    type="submit" 
                    className="btn-primary"
                  >
                    Confirm Payment
                  </button>
                </div>
              </form>
            )}

            {paymentStep === 2 && (
              <div className="payment-confirmation">
                <div className="success-message">
                  <h3>Payment Successful!</h3>
                  <p>Your payment of ${amount} has been processed via {paymentMethod === 'mpesa' ? 'M-PESA' : 'Bank Transfer'}.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'payment-history' && (
          <div className="history-section">
            <div className="history-header">
              <h2>Payment History</h2>
              <div className="export-buttons">
                <button 
                  onClick={() => exportTransactions('pdf')}
                  className="btn-export pdf"
                >
                  Export PDF
                </button>
                <button 
                  onClick={() => exportTransactions('excel')}
                  className="btn-export excel"
                >
                  Export Excel
                </button>
              </div>
            </div>
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td>{transaction.date}</td>
                    <td>${transaction.amount.toFixed(2)}</td>
                    <td>{transaction.method}</td>
                    <td>
                      <span className={'status ${transaction.status.toLowerCase()}'}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentSystem;