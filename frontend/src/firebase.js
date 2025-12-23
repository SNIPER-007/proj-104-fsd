import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
}

let app = null
let analytics = null
try {
  const hasConfig = firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId && firebaseConfig.appId
  if(!hasConfig){
    console.warn('Firebase config missing in env - auth disabled')
  } else {
    app = initializeApp(firebaseConfig)
    // Diagnostic (non-secret): show initialization and a short apiKey prefix and measurementId presence
    try{
      console.info('Firebase initialized:', !!app, 'apiKeyPrefix:', (firebaseConfig.apiKey || '').slice(0,6), 'measurementId:', firebaseConfig.measurementId || 'none')
      // Expose minimal non-secret debug values to window for quick verification in DevTools
      try{
        window.__FIREBASE_INITIALIZED = !!app
        window.__FIREBASE_API_KEY_PREFIX = (firebaseConfig.apiKey || '').slice(0,8)
      }catch(e){/* ignore in non-browser contexts */}
    }catch(e){
      // ignore
    }

    // Initialize analytics only in the browser and when measurementId is present
    if(typeof window !== 'undefined' && firebaseConfig.measurementId){
      try{
        analytics = getAnalytics(app)
      }catch(e){
        console.warn('Firebase analytics init failed', e)
      }
    }
  }
}catch(err){
  console.error('Firebase initialization error', err)
}

export const auth = app ? getAuth(app) : null
export { analytics }
export default app
