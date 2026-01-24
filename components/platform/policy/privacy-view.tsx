
import { Header, PrivacyContents } from './contract-of-service';

export default function PrivacyView() {
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-[--linky-surface-alt] pt-[70px]">
		  	<PrivacyContents />
      </div>
    </div>
  );
}