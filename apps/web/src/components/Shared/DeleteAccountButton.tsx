import useUser from '@/hooks/useUser';
import createClient from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react'

export default function DeleteAccountButton() {
  const { user, loading } = useUser();
  const supabase = createClient();
  const router = useRouter();
  const [isModalVisible, setModalVisible] = useState(false)
  const [deletionLoading, setDeletionLoading] = useState(false);

  async function deleteAccount() {
    try {
      setDeletionLoading(true)
      if (!user) throw new Error('No user')

      // call supabase edge function
      let res = await supabase.functions.invoke('user-self-deletion')
      if (res.error) throw res.error

      // force logout after completing
      await supabase.auth.signOut()
      router.push('/')
    } catch (error) {
      alert('Error deleting the account!')
      console.log(error)
    } finally {
      setDeletionLoading(false)
    }
  }
  return (
    <div>
      <button onClick={() => setModalVisible(true)}>Delete Account</button>
      {isModalVisible ? 
        <div className="h-screen flex items-center justify-center bg-black/30 fixed inset-0">
          <div className="p-5 w-3/4 max-w-100 h-84 bg-white rounded-xl shadow flex flex-col gap-5 items-center justify-center text-center whitespace-pre-line">
            <p>Are you sure you want to delete your account?</p>
            <p>All user information will be lost and cannot be restored.</p>
            
            {deletionLoading?
              <div>loading</div> 
              : 
              <div className='flex gap-5 w-full justify-between'>
                <button
                  className='border'
                  onClick={()=>setModalVisible(false)}
                >
                  Cancel
                </button>
                <button 
                  className='text-red-700 border'
                  onClick={deleteAccount} 
                  disabled={deletionLoading}
                >
                    Delete Account
                </button>
              </div>
            }
          </div>
        </div> : <></>}
    </div>
  )
}