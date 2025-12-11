import type { NextConfig } from 'next';

interface ExtendedNextConfig extends NextConfig {
  serverActions?: {
    bodySizeLimit?: string;
  };
}

const nextConfig: ExtendedNextConfig = {
  serverActions: {
    bodySizeLimit: '10mb'
  }
};

export default nextConfig;
