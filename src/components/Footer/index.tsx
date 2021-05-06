import type { JSX } from 'preact';

import { ReactComponent as GithubIcon } from 'assets/icons/github.svgr.svg';
import { ReactComponent as InstagramIcon } from 'assets/icons/instagram.svgr.svg';
import pkg from '../../../package.json';

import styles from 'components/Footer/Footer.module.css';

const FOUNDING_YEAR = 2021;

const Footer = (): JSX.Element => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer} aria-labelledby="footer-headline">
      <section className={styles.info}>
        <h2 id="footer-headline">
          <span>{pkg.displayName}</span>
        </h2>
        <span>
          &copy;{' '}
          <a
            href={pkg.author.url}
            target="_blank"
            rel="noindex nofollow noreferrer"
          >
            {pkg.author.name}
          </a>
          , {FOUNDING_YEAR}
          {currentYear !== FOUNDING_YEAR ? `—${currentYear}` : ''}
        </span>
      </section>
      <section aria-label="Links" className={styles.iconContainer}>
        <a
          href={pkg.repository.url}
          target="_blank"
          rel="noindex nofollow noreferrer"
        >
          <GithubIcon className={styles.icon} />
        </a>
        {/* <a
          href={pkg.repository.url}
          target="_blank"
          rel="noindex nofollow noreferrer"
        >
          <InstagramIcon className={styles.icon} />
        </a> */}
      </section>
    </footer>
  );
};

export default Footer;
