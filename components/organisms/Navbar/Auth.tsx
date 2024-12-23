import Link from 'next/link';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';
import { JWTPayloadTypes, UserTypes } from '../../../services/data-types';
import Image from 'next/image';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({
    avatar: '',
  });
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const jwtToken = atob(token);
      const payload: JWTPayloadTypes = jwtDecode(jwtToken);
      const userFromPayload: UserTypes = payload.player;
      setIsLogin(true);
      setUser(userFromPayload);
    }
  }, []);

  const onLogout = () => {
    Cookies.remove('token');
    router.push('/');
    setIsLogin(false);
  };

  if (isLogin) {
    return (
      <li className="nav-item my-auto dropdown d-flex">
        <div className="vertical-line d-lg-block d-none" />
        <div>
          <a
            className="dropdown-toggle ms-lg-40"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
          <Image
            src={`http://localhost:4000/uploads/${user.avatar}`}
            className="rounded-circle"
            width={60}
            height={60}
            alt=""
          />

          </a>

          <ul className="dropdown-menu border-0" aria-labelledby="dropdownMenuLink">
            <li><Link href="/member" className="dropdown-item text-lg color-palette-2">My Profile </Link></li>
            <li><Link href="/" className="dropdown-item text-lg color-palette-2" href="#">Wallet </Link></li>
            <li>
              <Link href="/member/edit-profile" className="dropdown-item text-lg color-palette-2" href="#">Account Settings</Link>
            </li>
            <li onClick={onLogout}><a className="dropdown-item text-lg color-palette-2" href="#">Log Out</a></li>
          </ul>
        </div>
      </li>
    );
  }
  return (
    <li className="nav-item my-auto">
      <Link href="/sign-in"
          className="btn btn-sign-in d-flex justify-content-center ms-lg-2 rounded-pill"
          role="button"
        >
          Sign In
        
      </Link>
    </li>

  );
}
