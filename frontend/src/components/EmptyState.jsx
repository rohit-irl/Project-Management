const EmptyState = () => {
  return (
    <div className="rounded-[32px] border border-[#e8e0d8] bg-white p-14 text-center shadow-[0_15px_40px_rgba(61,53,48,0.08)]">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#faf7f4] text-4xl text-[#a89b90] shadow-[0_8px_20px_rgba(61,53,48,0.08)]">
        ✨
      </div>
      <p className="mt-8 text-2xl font-semibold tracking-[0.01em] text-[#2c2420]">
        Nothing here yet. Add your first task.
      </p>
      <p className="mt-3 text-sm leading-6 text-[#a89b90]">
        Your workspace is calm and ready for your next idea.
      </p>
    </div>
  )
}

export default EmptyState
