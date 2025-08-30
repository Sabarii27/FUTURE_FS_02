import { collection, addDoc, serverTimestamp, query, where, getDocs, orderBy } from 'firebase/firestore'
import { db } from '../firebase'

export async function saveOrder(uid, order){
  const ref = collection(db, 'orders')
  await addDoc(ref, {
    uid,
    ...order,
    createdAt: serverTimestamp()
  })
}

export async function getOrders(uid){
  const ref = collection(db, 'orders')
  const q = query(ref, where('uid','==',uid), orderBy('createdAt','desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id:d.id, ...d.data() }))
}
