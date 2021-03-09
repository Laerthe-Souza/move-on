import axios from 'axios';
import Cookies from 'js-cookie';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';
import { useLoading } from '../hooks/useLoading';

import { Container, BackgroundImage, Content } from '../styles/pages';

interface UserData {
  name: string;
  username: string;
  avatarUrl: string;
  level: number;
  currentExperience: number;
  totalExperience: number;
  challengesCompleted: number;
}

export default function Home(): JSX.Element {
  const { push } = useRouter();

  const { isLoading } = useLoading();

  useEffect(() => {
    const url = window.location.href;

    const hasCode = url.includes('?code=');

    if (hasCode) {
      isLoading(true);

      const [, code] = url.split('?code=');

      axios.post('/api/login', { code }).then(response => {
        const gitUserdata = response.data as UserData;

        Cookies.defaults.expires = 1;
        Cookies.set('userdata', JSON.stringify(gitUserdata));

        push('/dashboard');
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Faça seu login | move.on</title>
      </Head>
      <Container>
        <BackgroundImage />

        <Content>
          <img src="/logo-white.svg" alt="Logo move.on" />

          <form>
            <strong>Bem-vindo</strong>

            <p>
              <FaGithub size={45} style={{ color: 'var(--text-highlight)' }} />
              Faça login com seu GitHub para começar
            </p>

            <Link
              href={`https://github.com/login/oauth/authorize?scope=user:email&client_id=${process.env.NEXT_PUBLIC_GITHUB_AUTH_CLIENT_ID}`}
            >
              <button
                type="button"
                onClick={() => {
                  isLoading(true);
                }}
              >
                <FaGithub size={35} style={{ color: 'var(--white)' }} />
                Login com GitHub
              </button>
            </Link>
          </form>
        </Content>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { userdata } = context.req.cookies;

  if (userdata) {
    return {
      props: {},
      redirect: {
        destination: '/dashboard',
      },
    };
  }

  return {
    props: {},
  };
};
