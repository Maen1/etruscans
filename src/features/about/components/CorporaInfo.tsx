export function CorporaInfo() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">About the corpora</h1>
      
      <div className="prose dark:prose-invert space-y-8">
        <section id="CIE" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold border-b pb-2">Corpus Inscriptionum Etruscarum (CIE)</h2>
          <p>
            The CIE is an <em>editio maior</em> of Etruscan and Faliscan, that also includes Latin inscriptions from Etruscan-speaking areas. It also includes <em>sigla</em> and very short inscriptions. The CIE includes line-drawings and, in later volumes, photographs, and includes measurements on the inscription and the text vehicle.
          </p>
          <p>
            Early CIE volumes (covering CIE 1-5606, 8801-8600 and CIE Suppl. I) are available online.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4 text-sm">
            <li>
              <strong>CIE 1-4917</strong> – Pauli, C., ed. 1893. <em>Corpus Inscriptionum Etruscarum I,1: Tituli 1-4917</em>, Leipzig: Barth{' '}
              <a href="http://urn.kb.se/resolve?urn=urn:nbn:se:alvin:portal:record-500484" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">
                &lt;http://urn.kb.se/resolve?urn=urn:nbn:se:alvin:portal:record-500484&gt;
              </a>.
            </li>
            <li>
              <strong>CIE 4918-5210</strong> – Danielsson, O.A., ed. 1907. <em>Corpus Inscriptionum Etruscarum II, 1,1: Tituli 4918-5210</em>, Leipzig: Barth{' '}
              <a href="http://urn.kb.se/resolve?urn=urn:nbn:se:alvin:portal:record-503306" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">
                &lt;http://urn.kb.se/resolve?urn=urn:nbn:se:alvin:portal:record-503306&gt;
              </a>.
            </li>
            <li>
              <strong>CIE 5211-5326</strong> – Danielsson, O.A., ed. 1923. <em>Corpus Inscriptionum Etruscarum II, 1,2: Tituli 5211-5326</em>, Leipzig: Barth{' '}
              <a href="http://urn.kb.se/resolve?urn=urn:nbn:se:alvin:portal:record-510347" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">
                &lt;http://urn.kb.se/resolve?urn=urn:nbn:se:alvin:portal:record-510347&gt;
              </a>.
            </li>
            <li>
              <strong>CIE Suppl. I</strong> – Herbig, G., ed. 1919-1921. <em>Corpus Inscriptionum Etruscarum, Supplementi Fasc. I. Libri lintei Etrusci fragmenta Zagrabiensia.</em> Leipzig: Barth{' '}
              <a href="https://nbn-resolving.org/urn:nbn:de:kobv:11-716318" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">
                &lt;https://nbn-resolving.org/urn:nbn:de:kobv:11-716318&gt;
              </a>.
            </li>
          </ul>
        </section>

        <section id="ET" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold border-b pb-2">Etruskische Texte (ET)</h2>
          <p>
            Rix, H. 1991. <em>Etruskische Texte. Editio minor.</em> Tübingen: Gunter Narr Verlag.
          </p>
        </section>

        <section id="CIL" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold border-b pb-2">Corpus Inscriptionum Latinarum (CIL)</h2>
          <p>
            The comprehensive collection of ancient Latin inscriptions from all corners of the Roman Empire.
          </p>
        </section>
        
        {/* Additional corpora sections would go here as needed (e.g. IG, Imagines Italicae, etc.) */}
      </div>
    </div>
  );
}
