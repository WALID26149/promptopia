'use client';

import { KindeProvider } from '@kinde-oss/kinde-auth-nextjs';

const Provider = ({ children }) => (
  <KindeProvider>
    {children}
  </KindeProvider>
);

export default Provider;