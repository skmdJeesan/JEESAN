'use client'
import Left from "./Left"
import Right from "./Right"

const Main = () => {
  return (
    <div className="flex flex-col sm:flex-row h-screen p-4 sm:p-8 lg:px-14 lg:py-11">
      <Left />
      <Right />
    </div>
  )
}

export default Main