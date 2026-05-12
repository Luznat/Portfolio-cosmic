import reactLogo from '../../../shared/assets/images/react.svg'
import viteLogo from '../../../shared/assets/images/vite.svg'
import { communityLinks, documentationLinks } from '../../../content/homeLinks'

export function NextStepsSection() {
  return (
    <section id="projetos">
      <div id="docs">
        <svg className="icon" role="presentation" aria-hidden>
          <use href="/icons.svg#documentation-icon"></use>
        </svg>
        <h2>Documentation</h2>
        <p>Your questions, answered</p>
        <ul>
          {documentationLinks.map((item) => (
            <li key={item.href}>
              <a href={item.href} target="_blank" rel="noreferrer">
                <img className={item.image === 'vite' ? 'logo' : 'button-icon'} src={item.image === 'vite' ? viteLogo : reactLogo} alt="" />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div id="contato">
        <svg className="icon" role="presentation" aria-hidden>
          <use href="/icons.svg#social-icon"></use>
        </svg>
        <h2>Connect with us</h2>
        <p>Join the Vite community</p>
        <ul>
          {communityLinks.map((item) => (
            <li key={item.href}>
              <a href={item.href} target="_blank" rel="noreferrer">
                <svg className="button-icon" role="presentation" aria-hidden>
                  <use href={`/icons.svg#${item.spriteId}`}></use>
                </svg>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
