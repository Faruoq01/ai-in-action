let paystackInstance: any = null;

export const getPaystackInstance = async () => {
  if (!paystackInstance && typeof window !== 'undefined') {
    const { default: PaystackPop } = await import('@paystack/inline-js');
    paystackInstance = new PaystackPop();
  }
  return paystackInstance;
};
