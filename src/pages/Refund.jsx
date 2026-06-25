import SEO from '../components/SEO';

const Refund = () => {
    return (
        <main className="pt-24 pb-20 px-4 md:px-12 max-w-4xl mx-auto bg-black min-h-screen selection:bg-vintage-gold selection:text-white">
            <SEO
                title="Refund Policy | CodeHTML"
                description="Review the Refund Policy for CodeHTML custom website, SaaS, and mobile app development services."
                noindex={true}
            />
            <h1 className="font-headline font-extrabold tracking-tight text-4xl md:text-6xl text-white mb-10 border-l border-vintage-gold pl-6 uppercase text-left">
                REFUND <span className="font-elegant italic font-light text-vintage-gold">POLICY.</span>
            </h1>
            <div className="space-y-8 font-body text-zinc-400 font-medium text-sm leading-relaxed text-left">
                <p>Effective Date: April 2026</p>
                <p>At CodeHTML, we strive to deliver high-quality digital solutions that exceed expectations. Because our studio custom-builds code, graphics, and systems specifically for your business, we maintain a clear policy regarding cancellations and refunds.</p>
                
                <section>
                    <h2 className="text-white text-xl mb-4 font-semibold uppercase tracking-normal">1. Advance Payment</h2>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>A minimum 50% advance payment is required before we begin any scoping, design, or development work.</li>
                        <li>This advance payment represents resource allocation, server provisioning, and project mobilization, and is strictly <strong>non-refundable</strong> once work has commenced.</li>
                    </ul>
                </section>
                
                <section>
                    <h2 className="text-white text-xl mb-4 font-semibold uppercase tracking-normal">2. Cancellation Process</h2>
                    <p className="mb-2">If you wish to cancel an active project, you must submit a formal, written cancellation request to our team. The cancellation will be processed under the following terms:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Cancellations must be sent directly via email from your authorized address to <a href="mailto:Contact@Codehtml.in" className="text-vintage-gold hover:underline">Contact@Codehtml.in</a>.</li>
                        <li>Upon receipt of the cancellation request, we will halt all development, hosting setups, and design processes immediately.</li>
                        <li>Any outstanding balances for milestones completed or hours worked up to the date of cancellation will remain due and payable immediately.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-white text-xl mb-4 font-semibold uppercase tracking-normal">3. Refund Eligibility & Exceptions</h2>
                    <p className="mb-2">Refunds (partial or full) are only considered under the following limited conditions:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Before Commencement:</strong> A full refund of the advance payment is eligible only if the client requests cancellation in writing before CodeHTML begins any discovery, scoping, or coding work.</li>
                        <li><strong>Failure of Delivery:</strong> If CodeHTML fails to deliver the promised services due to internal issues or errors, and cannot rectify the delivery within a reasonable cure period, a partial or full refund may be evaluated.</li>
                    </ul>
                </section>
                
                <section>
                    <h2 className="text-white text-xl mb-4 font-semibold uppercase tracking-normal">4. Strict No-Refund Cases</h2>
                    <p className="mb-2">Under no circumstances will refunds be issued in the following scenarios:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>After development, source code, database access, or server handovers have occurred.</li>
                        <li>For finished layouts or websites that have already been launched live.</li>
                        <li>Due to client-side delays, changes in business direction, or simple "change of mind" decisions after work has begun.</li>
                        <li>Due to third-party outages, API changes, or hosting service failures beyond our direct control.</li>
                    </ul>
                </section>
                
                <section>
                    <h2 className="text-white text-xl mb-4 font-semibold uppercase tracking-normal">5. Partial Refund Calculations</h2>
                    <p>In rare circumstances, at the sole discretion of our studio management, we may offer a partial refund. The refund amount will be calculated by subtracting the cost of hours already logged, completed design wireframes, scoping documents, and external API licenses purchased for the project from the total payments received.</p>
                </section>

                <section>
                    <h2 className="text-white text-xl mb-4 font-semibold uppercase tracking-normal">6. Refund Timeline & Method</h2>
                    <p className="mb-2">Approved refunds are processed under the following constraints:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Timeline:</strong> Once a refund is approved in writing by CodeHTML management, it will be processed and initiated within 7 to 14 business days.</li>
                        <li><strong>Method:</strong> All refunds are returned exclusively via the original payment method (bank transfer, credit card processor, or regional payment gateway) used to make the initial payment. We do not issue cash refunds or redirect funds to third-party accounts.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-white text-xl mb-4 font-semibold uppercase tracking-normal">7. Dispute Escalation</h2>
                    <p className="mb-2">If you have a disagreement regarding project delivery or billing, both parties agree to follow this resolution hierarchy:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Step 1 (Direct Review):</strong> Email your concerns to <a href="mailto:Contact@Codehtml.in" className="text-vintage-gold hover:underline">Contact@Codehtml.in</a>. A project lead will review the work logs and deliverables and schedule a review call within 3 business days.</li>
                        <li><strong>Step 2 (Management Escalation):</strong> If a resolution is not met, the dispute will escalate to our director for a final studio determination.</li>
                        <li><strong>Step 3 (Mediation):</strong> If direct agreement is not reached, the dispute must be referred to mediation in Raipur, Chhattisgarh, India, before any further legal remedies are pursued.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-white text-xl mb-4 font-semibold uppercase tracking-normal">8. Contact Us</h2>
                    <p className="mb-2">For any questions or cancellation requests under this Refund Policy:</p>
                    <p>📧 <a href="mailto:Contact@Codehtml.in" className="text-vintage-gold hover:underline font-bold">Contact@Codehtml.in</a></p>
                </section>
            </div>
        </main>
    );
}

export default Refund;
