import { TopBar } from '@/components/Header/TopBar'
import { Navigation } from '@/components/Header/Navigation'
import { Footer } from '@/components/Footer/Footer'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
    {
        question: "What is the typical shipping time?",
        answer: "Most orders are processed and shipped within 1-2 business days. Domestic shipping typically takes 3-5 business days."
    },
    {
        question: "Do you offer international shipping?",
        answer: "Yes, we ship to over 50 countries worldwide. International shipping times vary by location."
    },
    {
        question: "How can I track my order?",
        answer: "Once your order is shipped, you will receive an email with a tracking link to follow your package."
    },
    {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for all unworn and unwashed items. Simply contact our support team to start a return."
    }
]

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-white">
            <TopBar />
            <Navigation />
            <main className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
                <SectionHeading title="FAQ" subtitle="Common questions answered." />
                <div className="mt-12">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`item-${i}`} className="border-none bg-gray-50 rounded-3xl px-6">
                                <AccordionTrigger className="hover:no-underline font-black uppercase tracking-tight py-6 text-left">{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-gray-500 pb-6 leading-relaxed">{faq.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </main>
            <Footer />
        </div>
    )
}
