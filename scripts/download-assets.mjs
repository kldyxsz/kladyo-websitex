import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const assets = [
  // Favicon/Logo SVGs
  { url: 'https://framerusercontent.com/images/tPyzjYQlX4UO5r04F6dJBKg76cQ.svg', name: 'favicon.svg' },
  { url: 'https://framerusercontent.com/images/T99Q1b9RSlYQDRnaIlPDxPPEQQ4.png', name: 'apple-touch-icon.png' },
  { url: 'https://framerusercontent.com/images/WHmmty0mOv1Z8l7qMLwjGOGpPs.png', name: 'og-image.png' },
  
  // Logo/Brand SVGs
  { url: 'https://framerusercontent.com/images/KxR8z1Wv1hzap7cFDEST1JCawM.svg', name: 'logo-dark.svg' },
  { url: 'https://framerusercontent.com/images/Ovu1HVWZ9MCI9OEy05nVkIZ3Td4.svg', name: 'logo-light.svg' },
  { url: 'https://framerusercontent.com/images/tVxs1KFKJIkCD66caF2ruArmu8.svg', name: 'portal-icon-large.svg' },
  { url: 'https://framerusercontent.com/images/n4JZTvwu5Fhky9J4pSaq3eeVwo.svg', name: 'klarna-logo.svg' },
  
  // Hero/product screenshots
  { url: 'https://framerusercontent.com/images/6CnligMRZTqS1M171eobYauJ90.png', name: 'hero-screenshot.png' },
  { url: 'https://framerusercontent.com/images/aWJI6j2IekfehxfcI77xEJoYiag.png', name: 'app-screenshot.png' },
  
  // Project/Portal mockup images
  { url: 'https://framerusercontent.com/images/5GWl5eJalfHVZvcpWBDhadaGg.webp', name: 'portal-mockup-1.webp' },
  { url: 'https://framerusercontent.com/images/FDrzrD7FjBI6HZ73ckYinHbqY.webp', name: 'portal-mockup-2.webp' },
  { url: 'https://framerusercontent.com/images/JXR6jjJ29QlC8NvxRBJ2QbkHyo8.webp', name: 'portal-mockup-3.webp' },
  { url: 'https://framerusercontent.com/images/bOkRZCtEXWVpcJjCV4itGi9Q.webp', name: 'portal-mockup-4.webp' },
  { url: 'https://framerusercontent.com/images/a0dJIrS6DWxVsDPzjVpt1qGmHHk.webp', name: 'portal-mockup-large.webp' },
  
  // Gradient/pattern images
  { url: 'https://framerusercontent.com/images/UtDqkYTivD5Tot92lSPIZ96g.webp', name: 'gradient-bar.webp' },
  { url: 'https://framerusercontent.com/images/F0OaJ3hTbcWfNHnJN8hYZQI7BxU.webp', name: 'gradient-divider.webp' },
  { url: 'https://framerusercontent.com/images/wed3DUlO5aP3KLaQRpAkXPTpY.svg', name: 'large-text-svg.svg' },
  
  // Feature icons (48x48 SVGs)
  { url: 'https://framerusercontent.com/images/YRpvL4AiDXHlgrcUtuEuTNKr3U.svg', name: 'icon-feature-1.svg' },
  { url: 'https://framerusercontent.com/images/ZZG6sdcyaZLty7JyorcpgXpODY.svg', name: 'icon-feature-2.svg' },
  { url: 'https://framerusercontent.com/images/eFmZNPKJ4UA0hHCvTcuvMLfTc1Q.svg', name: 'icon-feature-3.svg' },
  { url: 'https://framerusercontent.com/images/sVhcZojYugyTP82esSwNhABYREI.svg', name: 'icon-feature-4.svg' },
  { url: 'https://framerusercontent.com/images/tQP4PNbDGg0cmmHunmHhp5JDo0.svg', name: 'icon-feature-5.svg' },
  { url: 'https://framerusercontent.com/images/xFLN8uDTGWjZyUKDmWhW9wPQh0c.svg', name: 'icon-feature-6.svg' },
  
  // 36x36 icons
  { url: 'https://framerusercontent.com/images/3uSxodP85eDakE14d41o99ZKVfY.svg', name: 'icon-small-1.svg' },
  { url: 'https://framerusercontent.com/images/4lSzxY2uVbyHymc5gXOswfzH20.svg', name: 'icon-small-2.svg' },
  { url: 'https://framerusercontent.com/images/H0qRjQk7PIr8nSwTRKQwH7ETnIA.svg', name: 'icon-small-3.svg' },
  { url: 'https://framerusercontent.com/images/WBAfKEhgPFIbEjQINnqb7SMdgA.svg', name: 'icon-small-4.svg' },
  { url: 'https://framerusercontent.com/images/YgyF79LtWxgy4TvrqGPHUoSqnCg.svg', name: 'icon-small-5.svg' },
  { url: 'https://framerusercontent.com/images/bPXFQmbkuvJHl2mOXbJ6rlbFQ.svg', name: 'icon-small-6.svg' },
  { url: 'https://framerusercontent.com/images/igcont9nPRUcKCyOWkTKgwbJCKY.svg', name: 'icon-small-7.svg' },
  { url: 'https://framerusercontent.com/images/v1unxaIQMrEWR3hHWB2N4cY8fQ.svg', name: 'icon-small-8.svg' },
  
  // UI elements
  { url: 'https://framerusercontent.com/images/NFn6JGqRDTBbBNCFao6qQS8Fx7Y.png', name: 'notification-card.png' },
  { url: 'https://framerusercontent.com/images/UMBvIJ3isvGpUv7RQBzgWFegs.png', name: 'transactions-card.png' },
  { url: 'https://framerusercontent.com/images/5LM5f7zJ5eoLbb41FY1LBtna00.png', name: 'payment-card.png' },
  { url: 'https://framerusercontent.com/images/K52Lcj6ziBPmu2nR04CT7eMKcco.png', name: 'contract-image.png' },
  { url: 'https://framerusercontent.com/images/d92Q0s5Hk77NwpO9ficf6C04UvI.webp', name: 'file-transfer.webp' },
  { url: 'https://framerusercontent.com/images/o3pKKNed0vUNSqLalbKyFzDfI8.webp', name: 'avatar.webp' },
  
  // Payment method images
  { url: 'https://framerusercontent.com/images/1COpM1JMQVCuesUUFuIjh1ti5A.png', name: 'payment-icons-1.png' },
  { url: 'https://framerusercontent.com/images/Ld7r9q1ehrFlpIlUYJLjcv1CSA.png', name: 'payment-icons-2.png' },
  { url: 'https://framerusercontent.com/images/iQXCCyP2w9EsyR3jBlYSD7TZuo.png', name: 'payment-icons-3.png' },
  { url: 'https://framerusercontent.com/images/nGIvB59wOSk1lu8WZNBtSy2K0dk.png', name: 'payment-icons-4.png' },
  
  // Card/flag images
  { url: 'https://framerusercontent.com/images/OXrEAFRGcEjDkwOEfc0urI.png', name: 'flag-1.png' },
  { url: 'https://framerusercontent.com/images/ScHzmVSy3Ch3CCFMssscB5Omvso.png', name: 'flag-2.png' },
  { url: 'https://framerusercontent.com/images/whPjEruuaKo7PqkugugXCmB0No.png', name: 'flag-3.png' },
  
  // Portal/profile screenshots
  { url: 'https://framerusercontent.com/images/BctiNOG7A4qu9sk0kOdPDhNVhk.png', name: 'profile-1.png' },
  { url: 'https://framerusercontent.com/images/JQKEIocTLzMyxG8rrco5AqV7Q.png', name: 'profile-2.png' },
  { url: 'https://framerusercontent.com/images/h7kBD9mc29TEGNxfDl1FiPom0w.png', name: 'profile-3.png' },
  
  // Other SVGs
  { url: 'https://framerusercontent.com/images/sdEzdFslfGVBmRtfqP1ByEF4hUQ.svg', name: 'arrow-icon.svg' },
  { url: 'https://framerusercontent.com/images/MC62uR83L7pJNxX5vnbAbesIYg.svg', name: 'brand-text-1.svg' },
  { url: 'https://framerusercontent.com/images/caCJeYYwv6TIsrKuvLny3mYOYeo.svg', name: 'brand-text-2.svg' },
  { url: 'https://framerusercontent.com/images/sgCSdRWfIJtcSIp1KqjOffSoI.svg', name: 'brand-text-3.svg' },
  { url: 'https://framerusercontent.com/images/tXAZOOcPdwcURU1OQcDHatNbrSM.svg', name: 'brand-text-4.svg' },
  { url: 'https://framerusercontent.com/images/uTYl7UjoPnTPDaXUdCdU8gFkew.svg', name: 'brand-text-5.svg' },
  { url: 'https://framerusercontent.com/images/rZ3WidNiwvjXpTBedh0GjXIQOs.svg', name: 'portal-wordmark.svg' },
  { url: 'https://framerusercontent.com/images/b2dcd8jQxsDy0NczWX28UgjM.svg', name: 'decorative-text.svg' },
  { url: 'https://framerusercontent.com/images/5xTSEosXCOuKDGh5FagmpGumk.svg', name: 'line-divider.svg' },
];

const dir = 'public/portal-assets';
await mkdir(dir, { recursive: true });

let success = 0, failed = 0;
const batch = 6;

for (let i = 0; i < assets.length; i += batch) {
  const chunk = assets.slice(i, i + batch);
  await Promise.all(chunk.map(async ({ url, name }) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      await writeFile(path.join(dir, name), buf);
      console.log(`✓ ${name} (${(buf.length/1024).toFixed(1)}KB)`);
      success++;
    } catch (e) {
      console.log(`✗ ${name}: ${e.message}`);
      failed++;
    }
  }));
}

console.log(`\nDone: ${success} downloaded, ${failed} failed`);
