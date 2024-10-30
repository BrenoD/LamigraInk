import Index from "@/pages/Landing-page"

import dynamic from 'next/dynamic';

const Dashboard = dynamic(() => import('../pages/Dashboard'), { ssr: false });

export default function Home() {
  return (
    <main>
      <Index/>
      
    </main>
  );
}
