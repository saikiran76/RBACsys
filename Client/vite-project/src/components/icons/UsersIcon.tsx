const UsersIcon = ({ className }: { className?: string }) => {
  return (
    <svg 
      className={className}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M9 11c1.65 0 3-1.35 3-3s-1.35-3-3-3-3 1.35-3 3 1.35 3 3 3zm0-4c.54 0 1 .46 1 1s-.46 1-1 1-1-.46-1-1 .46-1 1-1zm6 4c1.65 0 3-1.35 3-3s-1.35-3-3-3-3 1.35-3 3 1.35 3 3 3zm0-4c.54 0 1 .46 1 1s-.46 1-1 1-1-.46-1-1 .46-1 1-1zm-6 5c-2.33 0-7 1.17-7 3.5V18h7v-2h-5v-.5c0-.51 2.45-1.5 5-1.5zm6 0c-.29 0-.62.02-.97.05.02.01.03.03.04.04.67.67 1.93 1.41 1.93 1.41v2h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
    </svg>
  )
}

export default UsersIcon 