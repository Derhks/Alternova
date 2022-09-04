import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from '../components/Auth.'
import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Jokes from '../components/Jokes'

export default function Home() {
    const [isLoading, setIsLoading] = useState(true)
    const [session, setSession] = useState(null)

    useEffect(() => {
        let mounted = true

        async function getInitialSession() {
            const {
                data: { session },
            } = await supabase.auth.getSession()

            // only update the react state if the component is still mounted
            if (mounted) {
                if (session) {
                    setSession(session)
                }

                setIsLoading(false)
            }
        }

        getInitialSession()

        const { subscription } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session)
            }
        )

        return () => {
            mounted = false

            subscription?.unsubscribe()
        }
    }, [])

    return (
        <div className="container">
            <Head>
                <title>Prueba Técnica</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Header title="Alternova" />
                <div className="container" style={{ padding: '50px 0 100px 0' }}>
                  {!session ? (
                      <Auth />
                  ) : (
                      <Jokes key={session.user.id} session={session} />
                  )}
                </div>
            </main>

            <Footer />
        </div>
    )
}
