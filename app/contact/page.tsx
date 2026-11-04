'use client'
import { useState, type FormEvent } from "react"
import { socials } from "@/constants"
import Reveal from "@/utils/Reveal"
import Footer from "@/components/Footer"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"
import { useIris } from "@/utils/IrisProvider"

type ContactField = "name" | "email" | "message"
type FormFields = Record<ContactField, string>
type FieldErrors = Partial<Record<ContactField, string>>

const Page = () => {
  const [form, set_form] = useState<FormFields>({ name: "", email: "", message: "" })
  const [field_errors, set_field_errors] = useState<FieldErrors>({})
  const [status_message, set_status_message] = useState("")
  const [is_submitting, set_is_submitting] = useState(false)

  const handle_submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    set_field_errors({})
    set_status_message("")
    set_is_submitting(true)

    try {
      const website = String(new FormData(event.currentTarget).get("website") ?? "")
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website }),
      })
      const result: unknown = await response.json()

      if (!result || typeof result !== "object") {
        throw new Error("The server returned an invalid response.")
      }

      const payload = result as {
        error?: string
        fieldErrors?: FieldErrors
      }

      if (!response.ok) {
        if (payload.fieldErrors) set_field_errors(payload.fieldErrors)
        set_status_message(payload.error ?? "Could not send your message. Please try again.")
        return
      }

      set_form({ name: "", email: "", message: "" })
      set_status_message("Thanks for reaching out! Your message has been sent.")
    } catch (error) {
      console.error("Contact form submission failed:", error)
      set_status_message("Could not send your message. Check your connection and try again.")
    } finally {
      set_is_submitting(false)
    }
  }

  const navigate = useIris()

  return (
    <div className='h-screen p-4 sm:p-8 lg:px-12 lg:py-11'>
      <div className="w-full flex flex-col justify-between h-full p-1">

        <div className="space-y-6 sm:space-y-8">
          <div className="ml-2 flex w-full items-center justify-between">
            <Reveal>
              <img alt="Personal Info" loading="lazy" width="52" height="61" decoding="async" data-nimg="1"
                src="contact_img.svg"
              />
            </Reveal>
            <div className="flex gap-1 items-center mt-1 text-sm">
              <Reveal>
                <button onClick={(e) => navigate(`/`, e)}
                  className="border border-slate-200/40 px-3 py-1.5 cursor-pointer flex items-center gap-2 w-fit hover:bg-slate-200 hover:text-zinc-900 transition-colors duration-500 ">
                  <FiArrowLeft size={18} />
                  <p className="">Home</p>
                </button>
              </Reveal>
              <Reveal>
                <button onClick={(e) => navigate(`/experiences`, e)}
                  className="border border-slate-200/40 px-3 py-1.5 cursor-pointer flex items-center gap-2 w-fit hover:bg-slate-200 hover:text-zinc-900 transition-colors duration-500 ">
                  <FiArrowLeft size={18} />
                  <p className="hidden sm:block">Back to Experiences</p>
                  
                </button>
              </Reveal>

            </div>
          </div>

          <div className="flex flex-col gap-3 sm:gap-10 lg:flex-row">
            <div className="flex w-full flex-col items-start gap-2 sm:gap-6 lg:w-[30%]">
              <div className="">
                <Reveal>
                  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">It&apos;s time to talk!<br />Contact me</h1>
                </Reveal>
              </div>
              <div className="">
                <Reveal>
                  <p className="font-serif italic tracking-tighter mb-4">skmdjeesan@gmail.com</p>
                </Reveal>
              </div>
              <div className="bottom w-full">
                <ul className="flex flex-wrap items-center gap-3">
                  {socials.map(({ name, href, Icon }) => (
                    <Reveal key={name}>
                      <li>
                        <a
                          href={href}
                          target={href.startsWith('mailto:') ? undefined : '_blank'}
                          rel="noopener noreferrer"
                          aria-label={name}
                          title={name}
                          className="flex gap-2 h-6 sm:h-8 w-fit rounded-md items-center justify-center border border-slate-200/20 bg-white/5 text-slate-200 transition-colors duration-400 hover:border-slate-200/50 hover:bg-slate-200 hover:text-zinc-800 px-2 py-1"
                        >
                          <Icon className="w-4 h-4" />
                          {name}
                        </a>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex w-full min-w-0 flex-col items-start gap-6 lg:w-[70%]">
              <div className="mt-1">
                <Reveal>
                  <h2 className="font-medium text-slate-300 tracking-tight leading-[1.3]">
                    Best way to reach out is skmdjeesan@gmail.com or just simply fill out the form below.<br />Don&apos;t be shy, I love to talk to new people and make new connections.
                  </h2>
                </Reveal>
              </div>
              <Reveal className="relative w-full overflow-hidden" motionClassName="w-full">
                <form onSubmit={handle_submit} className="w-full space-y-2">
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div className="space-y-2">
                      {/* <label htmlFor="contact-name" className="text-sm font-medium text-slate-300">
                      Name
                    </label> */}
                      <input
                        id="contact-name"
                        name="name"
                        autoComplete="name"
                        required
                        minLength={2}
                        maxLength={60}
                        value={form.name}
                        onChange={(event) => set_form({ ...form, name: event.target.value })}
                        aria-invalid={Boolean(field_errors.name)}
                        aria-describedby={field_errors.name ? "contact-name-error" : undefined}
                        className="w-full border border-slate-200/20 bg-zinc-900/50 px-3 py-2.5 text-slate-200 outline-none transition-colors placeholder:text-slate-500 focus:border-slate-200 focus:bg-zinc-800"
                        placeholder="Your name"
                      />
                      {field_errors.name && (
                        <p id="contact-name-error" className="text-sm text-slate-400">{field_errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      {/* <label htmlFor="contact-email" className="text-sm font-medium text-slate-300">
                      Email
                    </label> */}
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        maxLength={100}
                        value={form.email}
                        onChange={(event) => set_form({ ...form, email: event.target.value })}
                        aria-invalid={Boolean(field_errors.email)}
                        aria-describedby={field_errors.email ? "contact-email-error" : undefined}
                        className="w-full border border-slate-200/20 bg-zinc-900/50 px-3 py-2.5 text-slate-200 outline-none transition-colors placeholder:text-slate-500 focus:border-slate-200 focus:bg-zinc-800"
                        placeholder="you@example.com"
                      />
                      {field_errors.email && (
                        <p id="contact-email-error" className="text-sm text-slate-400">{field_errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {/* <label htmlFor="contact-message" className="text-sm font-medium text-slate-300">
                    Message
                  </label> */}
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      minLength={10}
                      maxLength={2000}
                      rows={6}
                      value={form.message}
                      onChange={(event) => set_form({ ...form, message: event.target.value })}
                      aria-invalid={Boolean(field_errors.message)}
                      aria-describedby={field_errors.message ? "contact-message-error" : undefined}
                      className="w-full resize-y border border-slate-200/20 bg-zinc-900/50 px-3 py-2.5 text-slate-200 outline-none transition-colors placeholder:text-slate-500 focus:border-slate-200 focus:bg-zinc-800"
                      placeholder="What would you like to talk about?"
                    />
                    {field_errors.message && (
                      <p id="contact-message-error" className="text-sm text-slate-400">{field_errors.message}</p>
                    )}
                    <p className="text-right text-xs text-slate-500">{form.message.length}/2000</p>
                  </div>

                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                    onChange={() => undefined}
                  />

                  <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center -mt-6">
                    <button
                      type="submit"
                      disabled={is_submitting}
                      className="w-full cursor-pointer border border-slate-200/40 px-4 py-2.5 font-medium text-slate-200 transition-colors duration-300 hover:bg-slate-200 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                    >
                      {is_submitting ? "Sending..." : "Send message"}
                    </button>
                    <p role="status" aria-live="polite" className="text-sm text-slate-300">
                      {status_message}
                    </p>
                  </div>
                </form>
              </Reveal>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default Page