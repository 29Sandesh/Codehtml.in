import SEO from '../components/SEO';

const Privacy = () => {
    return (
        <main className="pt-24 pb-20 px-4 md:px-12 max-w-4xl mx-auto bg-black min-h-screen selection:bg-vintage-gold selection:text-white">
            <SEO
                title="Privacy Policy | CodeHTML"
                description="Read the Privacy Policy for CodeHTML and how we handle project inquiries, cookies, and user data in compliance with GDPR and international standards."
                noindex={true}
            />
            <h1 className="font-headline font-extrabold tracking-tight text-4xl md:text-6xl text-white mb-10 border-l border-vintage-gold pl-6 uppercase text-left">
                PRIVACY <span className="font-elegant italic font-light text-vintage-gold">POLICY.</span>
            </h1>
            <div className="space-y-8 font-body text-zinc-400 font-medium text-sm leading-relaxed">
                <p>Effective Date: April 2026</p>
                <p>At CodeHTML, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and share your data when you visit our website or interact with our digital studio services.</p>
                
                <section>
                    <h2 className="text-white text-xl mb-4 font-semibold uppercase tracking-normal">1. Information We Collect</h2>
                    <p className="mb-2">We may collect:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Name, phone number, and email address</li>
                        <li>Business details shared by you during project scoping</li>
                        <li>Any information submitted via contact forms, emails, or direct chats</li>
                        <li>Technical information collected automatically through cookies and analytics tools</li>
                    </ul>
                </section>
                
                <section>
                    <h2 className="text-white text-xl mb-4 font-semibold uppercase tracking-normal">2. Cookies and Analytics Tracking</h2>
                    <p className="mb-2">We use cookies and similar tracking technologies to analyze site traffic, optimize website performance, and improve your user experience.</p>
                    <p className="mb-2">Specifically, we use <strong>Google Analytics (GA4)</strong> to gather anonymous, aggregated data about how visitors interact with our site. This includes pageviews, session duration, device types, and generalized geolocation data.</p>
                    <p>GA4 only fires and collects tracking data if you explicitly consent by clicking "Accept" on our cookie consent banner. You can opt out at any time by clearing your browser cookies or choosing "Decline" on the banner. Our systems honor your choice and anonymize IP addresses for all tracking hits.</p>
                </section>

                <section>
                    <h2 className="text-white text-xl mb-4 font-semibold uppercase tracking-normal">3. How We Use Your Information</h2>
                    <p className="mb-2">We use your data to:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Communicate with you regarding project inquiries, scoping, and updates</li>
                        <li>Provide premium custom software and website development services</li>
                        <li>Maintain, secure, and optimize our web properties</li>
                    </ul>
                </section>
                
                <section>
                    <h2 className="text-white text-xl mb-4 font-semibold uppercase tracking-normal">4. Data Retention</h2>
                    <p>We only retain your personal information for as long as is necessary to fulfill the purposes for which it was collected, including scoping potential projects or servicing active contracts. Inactive customer records and project inquiry details submitted through our site are automatically deleted or securely archived after 2 years of last contact.</p>
                </section>

                <section>
                    <h2 className="text-white text-xl mb-4 font-semibold uppercase tracking-normal">5. International Data Transfers</h2>
                    <p>CodeHTML operates globally, and our main development facilities and data controllers are located in India. The information we collect may be transferred, stored, and processed internationally. By submitting your data or consenting to analytics cookies, you acknowledge and agree to these data transfers, which are protected under standard contractual clauses.</p>
                </section>

                <section>
                    <h2 className="text-white text-xl mb-4 font-semibold uppercase tracking-normal">6. Your Data Rights (GDPR & International Standards)</h2>
                    <p className="mb-2">Depending on your location (including the UK, EU, and various US states), you have specific rights regarding your personal data:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Right to Access & Rectify:</strong> You can request a copy of the data we hold about you or ask us to correct inaccuracies.</li>
                        <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> You can request that we delete all your personal data from our active records.</li>
                        <li><strong>Right to Restrict Processing:</strong> You can object to or limit the way we process your data.</li>
                        <li><strong>Right to Data Portability:</strong> You can request that we export your data in a clean, machine-readable format.</li>
                    </ul>
                    <p className="mt-2">To exercise any of these rights, contact us at the email address listed below.</p>
                </section>

                <section>
                    <h2 className="text-white text-xl mb-4 font-semibold uppercase tracking-normal">7. Sharing of Information</h2>
                    <p>We do not sell, trade, or rent your personal information to third-party marketing companies. We only share data with trusted infrastructure providers (such as hosting platforms or email servers) strictly necessary to deliver our services, and under strict confidentiality agreements.</p>
                </section>

                <section>
                    <h2 className="text-white text-xl mb-4 font-semibold uppercase tracking-normal">8. Children's Privacy</h2>
                    <p>Our services and website are intended for commercial businesses and adults. We do not knowingly or intentionally collect personal information from individuals under the age of 16.</p>
                </section>

                <section>
                    <h2 className="text-white text-xl mb-4 font-semibold uppercase tracking-normal">9. Data Controller & Contact Us</h2>
                    <p className="mb-2">The data controller for our website and studio services is CodeHTML, located in Raipur, Chhattisgarh, India.</p>
                    <p className="mb-2">For any questions regarding this Privacy Policy or to submit data requests:</p>
                    <p>📧 <a href="mailto:Contact@Codehtml.in" className="text-vintage-gold hover:underline font-bold">Contact@Codehtml.in</a></p>
                </section>
            </div>
        </main>
    );
}

export default Privacy;
