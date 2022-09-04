import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Jokes({ session }) {
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [website, setWebsite] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)

    useEffect(() => {
        getProfile()
    }, [session])

    async function getCurrentUser() {
        const {
            data: { session },
            error,
        } = await supabase.auth.getSession()

        if (error) {
            throw error
        }

        if (!session?.user) {
            throw new Error('User not logged in')
        }

        return session.user
    }

    async function getProfile() {
        try {
            setLoading(true)
            const user = await getCurrentUser()

            let { data, error, status } = await supabase
                .from('profiles')
                .select(`username, website, avatar_url`)
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setUsername(data.username)
                setWebsite(data.website)
                setAvatarUrl(data.avatar_url)
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    getCurrentUser()

    return (
        <div>
            <div>
                <div>
                    <button>Get Jokes</button>
                </div>
                <div>
                    <button>My Jokes</button>
                </div>
            </div>
            <div id="signup-button">
                <button
                    className="button block"
                    onClick={() => supabase.auth.signOut()}
                >
                    Sign Out
                </button>
            </div>
        </div>
    )
}
