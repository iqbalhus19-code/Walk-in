const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: 'YOUR_KEY_ID', // Enter the Key ID generated from the Dashboard
  key_secret: 'YOUR_KEY_SECRET' // Enter the Key Secret generated from the Dashboard
});

// Create an Order
const createOrder = async (amount) => {
  const options = {
    amount: amount * 100, // amount in lowest currency unit
    currency: 'INR',
    receipt: 'receipt#1'
  };
  
  try {
    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    throw new Error('Error creating order: ' + error.message);
  }
};

// Initialize Checkout
const checkout = async (orderId) => {
  const options = {
    orderId: orderId
  };
  return options; // Add additional parameters as needed for UI integration
};

// Verify Payment
const verifyPayment = (response) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

  const generated_signature = crypto.createHmac('sha256', 'YOUR_KEY_SECRET')
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');

  return generated_signature === razorpay_signature;
};

module.exports = { createOrder, checkout, verifyPayment };