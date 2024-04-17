import { cn } from "@/lib/utils"

const MaxWidthWrapper = ({
  className,
  children
}) => {
  return (
    <div className={cn(`mx-auto w-full max-w-7xl sm:px-6 lg:px-8`, className)}>
      {children}
    </div>
  )
}

export default MaxWidthWrapper