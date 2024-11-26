const HomeIcon = ({ className }: { className?: string }) => {
  return (
    <svg 
      className={className}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M12 3L4 9v12h5v-7h6v7h5V9l-8-6zm0 2.7l5 3.75V19h-2v-7H9v7H7v-9.55l5-3.75z"/>
    </svg>
  )
}

export default HomeIcon 