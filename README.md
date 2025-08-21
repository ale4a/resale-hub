# Ticket Resale Platform 

A modern, secure ticket resale marketplace built with React, TypeScript, and Tailwind CSS.

## Project Overview

This is a Web2 ticket resale platform that allows users to buy and sell event tickets safely and securely. The platform features:

- **Multiple Payment Methods**: Credit cards, PayPal, bank transfers, and cryptocurrency payments
- **Crypto Integration**: Optional wallet connection for crypto payments with MetaMask support
- **Buyer Protection**: Secure escrow system and buyer guarantees
- **Modern UI**: Beautiful, responsive design built with shadcn/ui and Tailwind CSS
- **Real-time Search**: Advanced filtering and search capabilities
- **Mobile Responsive**: Works seamlessly across all devices

## Technologies Used

This project is built with:

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Build Tool**: Vite
- **Routing**: React Router
- **State Management**: React Hooks
- **Icons**: Lucide React
- **Crypto Integration**: MetaMask wallet connection

## Features

### For Buyers

- Browse available tickets with advanced filtering
- Multiple payment options including crypto
- Secure payment processing
- Instant ticket delivery via email
- Buyer protection guarantees

### For Sellers (Coming Soon)

- List tickets for sale
- Set pricing and availability
- Track sales and earnings
- Secure payment processing

### Crypto Payment Features

- MetaMask wallet integration
- Secure message signing for payment authorization
- Support for ETH, USDC, and other cryptocurrencies
- Seamless Web2 experience with optional crypto payments

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask extension (for crypto payments)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd resale-hub
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/ui/          # Reusable UI components
├── pages/                  # Page components
├── data/                   # Mock data and constants
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
└── contexts/               # React contexts (WalletProvider)
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

This project uses:

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Tailwind CSS for styling

## Crypto Payment Flow

1. **Select Crypto Payment**: Choose crypto payment option during checkout
2. **Connect Wallet**: MetaMask will prompt for connection approval
3. **Sign Authorization**: Sign a message authorizing the payment
4. **Process Payment**: Payment is processed securely
5. **Receive Tickets**: Tickets are sent to your email

## Deployment

The project can be deployed to any static hosting service:

1. Build the project:

```bash
npm run build
```

2. Deploy the `dist` folder to your hosting service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.
