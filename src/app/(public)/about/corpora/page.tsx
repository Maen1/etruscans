import { CorporaInfo } from '@/features/about/components/CorporaInfo';

export const metadata = {
  title: 'About the Corpora - Etruscans in the Archive',
  description: 'Information about the epigraphic corpora used in the database.',
};

export default function CorporaPage() {
  return <CorporaInfo />;
}
