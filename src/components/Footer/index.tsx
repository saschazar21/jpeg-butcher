import type { JSX } from 'preact';

import { ReactComponent as GithubIcon } from 'assets/icons/github.svgr.svg';
import pkg from '../../../package.json';

import styles from 'components/Footer/Footer.module.css';

const FOUNDING_YEAR = 2021;

const Footer = (): JSX.Element => {
  const currentYear = new Date().getFullYear();
  const privacyURL = new URL('#privacy', pkg.repository.url).toString();

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
            rel="noindex, nofollow, noreferrer"
          >
            {pkg.author.name}
          </a>
          , {FOUNDING_YEAR}
          {currentYear !== FOUNDING_YEAR ? `—${currentYear}` : ''}
        </span>
        <a href={privacyURL} rel="noindex, nofollow, noreferrer">
          Privacy Notice
        </a>
      </section>
      <section aria-label="Links" className={styles.iconContainer}>
        <a
          href={pkg.repository.url}
          target="_blank"
          title="Take a look at the source code on GitHub"
          rel="noindex, nofollow, noreferrer"
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
