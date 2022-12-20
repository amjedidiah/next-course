import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"
import styles from "../styles/navbar.module.scss"

type NavbarProps = {
  username: string
}

export default function Navbar({ username }: NavbarProps) {
  const router = useRouter()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleSignOut = useCallback((e: React.MouseEvent) => {
    e.preventDefault()

    // Sign out

    // Head to login
    router.push("/login")

    // NOTE: We don't need to add the router as a dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleDropdown = useCallback(
    () => setIsDropdownOpen(!isDropdownOpen),
    [isDropdownOpen]
  )

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/" className={styles["logo-link"]}>
          <div className={styles["logo-wrapper"]}>
            <Image
              src="/static/netflix.svg"
              alt="Netflix logo"
              width={128}
              height={34}
            />
          </div>
        </Link>
        <ul className={styles["nav-list"]}>
          <li className={styles["nav-item"]}>
            <Link href="/">Home</Link>
          </li>
          <li className={styles["nav-item"]}>
            <Link href="/browse/my-list">My List</Link>
          </li>
        </ul>
        <nav className={styles["nav-container"]}>
          <div>
            <button
              type="button"
              className={styles["btn-username"]}
              onClick={toggleDropdown}
            >
              <p className={styles.username}>{username}</p>
              <Image
                src="/static/expand_more.svg"
                alt="Expand more"
                width={24}
                height={24}
              />
            </button>

            {isDropdownOpen && (
              <div className={styles["nav-dropdown"]}>
                <div>
                  <button
                    type="button"
                    className={styles["link-name"]}
                    onClick={handleSignOut}
                  >
                    Logout
                  </button>
                  <div className={styles["line-wrapper"]} />
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  )
}
