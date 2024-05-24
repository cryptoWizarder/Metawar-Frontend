export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const SEPOLIA_TESTNET_PARAMS = { chainId: '0xAA36A7', }

export const API_URL = process.env.PUBLIC_URL || process.env.NEXT_PUBLIC_API_URL || '/api/v1';
