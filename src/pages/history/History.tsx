import ProfileSection from '../home/components/profile-section'
import HistorySection from './components/transaction-history'

const History = () => {
  return (
    <div className="min-h-screen py-8">
      <ProfileSection />
      <HistorySection />
    </div>
  )
}

export default History
