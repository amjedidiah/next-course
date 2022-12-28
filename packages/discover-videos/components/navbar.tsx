import { useMagicUserMetadata } from "hooks/use-magic-user"
import { useRouteChange } from "hooks/use-route-change"
import magic from "lib/magic.lib"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useState } from "react"
import styles from "../styles/navbar.module.scss"

type NavbarProps = {
  minimal?: boolean
}

export default function Navbar({ minimal }: NavbarProps) {
  const {router} = useRouteChange()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { userMetadata, isFetching } = useMagicUserMetadata()

  const handleSignOut = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault()

    if (!magic) return

    // Sign out
    await magic.user.logout()

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
    <header className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/" className={styles["logo-link"]}>
          <div className={styles["logo-wrapper"]}>
            <Image
              src="/static/netflix.svg"
              alt="Netflix logo"
              width={128}
              height={34}
              priority
            />
          </div>
        </Link>
        {!minimal && (
          <ul className={styles["nav-list"]}>
            <li className={styles["nav-item"]}>
              <Link href="/">Home</Link>
            </li>
            <li className={styles["nav-item"]}>
              <Link href="/browse/my-list">My List</Link>
            </li>
          </ul>
        )}
        {!minimal && (
          <nav className={styles["nav-container"]}>
            <div>
              <button
                type="button"
                className={styles["btn-username"]}
                onClick={toggleDropdown}
              >
                <p className={styles.username}>{userMetadata?.email}</p>
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
        )}
      </div>
    </header>
  )
}
