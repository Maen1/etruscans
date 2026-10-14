import { UnidentifiedList } from '@/features/unidentified/components/UnidentifiedList';

export const metadata = {
  title: 'Unidentified Inscriptions - Etruscans in the Archive',
  description: 'A list of inscriptions in the archive that have not yet been securely identified.',
};

export const dynamic = 'force-dynamic';

export default function UnidentifiedPage() {
  return <UnidentifiedList />;
}
