import SEO from '../components/SEO';

const Terms = () => {
    return (
        <main className="pt-24 pb-20 px-4 md:px-12 max-w-4xl mx-auto bg-black min-h-screen selection:bg-vintage-gold selection:text-white">
            <SEO
                title="Terms & Conditions | CodeHTML"
                description="Review the Terms and Conditions for CodeHTML. Learn about payment terms, intellectual property ownership, confidentiality, and governing law."
                noindex={true}
            />
            <h1 className="font-headline font-extrabold tracking-tight text-4xl md:text-6xl text-white mb-10 border-l border-vintage-gold pl-6 uppercase text-left">
                TERMS & <span className="font-elegant italic font-light text-vintage-gold">CONDITIONS.</span>
            </h1>
            <div className="space-y-8 font-body text-zinc-400 font-medium text-sm leading-relaxed">
                <p>Effective Date: April 2026</p>
                <p>Welcome to CodeHTML. These Terms & Conditions ("Terms") govern your use of our website and services. By engaging our digital studio for web design, custom software development, or related services, you agree to comply with and be bound by these Terms.</p>
                
                <section>
                    <h2 className="text-white text-xl mb-4 font-semibold uppercase tracking-normal">1. Services</h2>
                    <p>CodeHTML provides premium website design, development, custom SaaS engineering, mobile application development, workflow automation, and related technology services. Scope details, milestones, and deliverables are specified in writing for individual client agreements.</p>
                </section>
                
                <section>
                    <h2 className="text-white text-xl mb-4 font-semibold uppercase tracking-normal">2. Payment Terms</h2>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>A minimum of 50% advance payment is required before starting any design or development project.</li>
                        <li>Remaining milestone payments and final balances must be completed and cleared before final source code handover, server deployment, or website delivery.</li>
                        <li>All payments are non-refundable, subject to our Refund Policy.</li>
                    </ul>
                </section>
                
                <section>
                    <h2 className="text-white text-xl mb-4 font-semibold uppercase tracking-normal">3. Project Timeline and Client Responsibilities</h2>
                    <p className="mb-2">Timelines depend entirely on the specified project scope and prompt client responsiveness. Clients must:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Provide required assets, database materials, product copy, images, and API credentials on time.</li>
                        <li>Review milestones and provide consolidated feedback/approvals promptly.</li>
                        <li>Understand that delays in client feedback, credentials, or content will extend delivery timelines.</li>
                    </ul>
                </section>
                
                <section>
                    <h2 className="text-white text-xl mb-4 font-semibold uppercase tracking-normal">4. Revisions & Scope Creep</h2>
                    <p>We provide reasonable design and functional revisions during active milestones as agreed in the initial contract. Any requests for additional features, integrations, or alterations outside the signed scope of work will be billed at our standard hourly rates or quoted separately as scope additions.</p>
                </section>

                <section>
                    <h2 className="text-white text-xl mb-4 font-semibold uppercase tracking-normal">5. Intellectual Property & Ownership</h2>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Our Pre-Existing IP:</strong> CodeHTML retains all rights, title, and interest in its proprietary tools, libraries, boilerplate code, and development frameworks used to build the client's software.</li>
                        <li><strong>Client IP:</strong> The client retains all intellectual property rights in their text, logo, brand assets, and pre-existing business materials provided to us.</li>
                        <li><strong>Deliverables:</strong> Full intellectual property ownership of the custom code, styling, and graphics created specifically for the project is transferred to the client upon receipt and clearing of full and final payment.</li>
                        <li><strong>Portfolio Rights:</strong> CodeHTML reserves the right to display screenshots, videos, and descriptions of the completed website or application in its portfolio, case studies, and partner materials unless explicitly prohibited in a signed Non-Disclosure Agreement (NDA).</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-white text-xl mb-4 font-semibold uppercase tracking-normal">6. Confidentiality</h2>
                    <p>Both CodeHTML and the client agree to protect and keep secret all confidential business details, financial data, and technical specifications shared during the course of the project. This obligation survives for two (2) years following the termination or completion of services.</p>
                </section>

                <section>
                    <h2 className="text-white text-xl mb-4 font-semibold uppercase tracking-normal">7. Indemnification</h2>
                    <p>You agree to indemnify, defend, and hold harmless CodeHTML, its developers, and officers from and against any claims, losses, damages, or liabilities arising out of the content, trademarks, or assets you provide for integration into the website or application, or your violation of these Terms.</p>
                </section>

                <section>
                    <h2 className="text-white text-xl mb-4 font-semibold uppercase tracking-normal">8. Limitation of Liability & Warranty Disclaimer</h2>
                    <p className="mb-2">Services are provided "as-is" and "as-available" without warranties of any kind, either express or implied, including merchantability or fitness for a particular purpose. CodeHTML is not responsible for:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Direct, indirect, incidental, or consequential business losses, profit drops, or downtime.</li>
                        <li>Third-party platform service failures (including hosting outages, domain registry issues, API policy changes, or gateway downtime).</li>
                        <li>Security breaches or data losses occurring outside of our direct hosting configurations.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-white text-xl mb-4 font-semibold uppercase tracking-normal">9. Force Majeure</h2>
                    <p>Neither party shall be liable for failure to perform its obligations under these Terms if such failure is due to events beyond its reasonable control, including natural disasters, acts of God, pandemics, strikes, war, acts of terrorism, civil unrest, or government restrictions.</p>
                </section>

                <section>
                    <h2 className="text-white text-xl mb-4 font-semibold uppercase tracking-normal">10. Governing Law & Jurisdiction</h2>
                    <p>These Terms shall be governed by, interpreted, and construed in accordance with the laws of India. Any legal disputes, claims, or actions arising out of or related to our services or website shall be subject to the exclusive jurisdiction of the competent courts located in Raipur, Chhattisgarh, India.</p>
                </section>

                <section>
                    <h2 className="text-white text-xl mb-4 font-semibold uppercase tracking-normal">11. Dispute Resolution</h2>
                    <p>In the event of a dispute, both parties agree to first seek resolution through good-faith negotiation. If negotiation fails to resolve the matter within thirty (30) days, the dispute shall be referred to mediation before seeking arbitration or legal recourse in the courts of Raipur.</p>
                </section>

                <section>
                    <h2 className="text-white text-xl mb-4 font-semibold uppercase tracking-normal">12. Severability & Entire Agreement</h2>
                    <p>If any provision of these Terms is found to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect. These Terms constitute the entire agreement between CodeHTML and you regarding our website and services, superseding all prior communications.</p>
                </section>

                <section>
                    <h2 className="text-white text-xl mb-4 font-semibold uppercase tracking-normal">13. Termination</h2>
                    <p>We reserve the right to suspend or terminate our services, hosting, or contract immediately if these Terms are violated, payments are delayed, or if client behavior becomes abusive, without prejudice to our right to recover unpaid balances.</p>
                </section>

                <section>
                    <h2 className="text-white text-xl mb-4 font-semibold uppercase tracking-normal">14. Contact Us</h2>
                    <p className="mb-2">For any questions or legal inquiries regarding these Terms:</p>
                    <p>📧 <a href="mailto:Contact@Codehtml.in" className="text-vintage-gold hover:underline font-bold">Contact@Codehtml.in</a></p>
                </section>
            </div>
        </main>
    );
}

export default Terms;
