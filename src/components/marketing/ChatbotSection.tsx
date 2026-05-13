'use client'

import { useEffect } from 'react'

function hideEl(el: Element | null) {
  if (!el) return
  const target = el.closest('span') ?? el
  ;(target as HTMLElement).style.setProperty('display', 'none', 'important')
  ;(target as HTMLElement).style.setProperty('height', '0', 'important')
  ;(target as HTMLElement).style.setProperty('overflow', 'hidden', 'important')
}

function hideBranding() {
  const host = document.querySelector('n8nchatui-popup')
  const root = host?.shadowRoot

  if (root) {
    hideEl(root.getElementById('lite-badge'))
    hideEl(root.querySelector('a[href*="n8nchatui"]'))
  } else {
    hideEl(document.getElementById('lite-badge'))
    hideEl(document.querySelector('a[href*="n8nchatui"]'))
  }
}

export function FloatingChatbot() {
  useEffect(() => {
    const observer = new MutationObserver(hideBranding)
    observer.observe(document.body, { childList: true, subtree: true })

    const t1 = setTimeout(hideBranding, 500)
    const t2 = setTimeout(hideBranding, 1500)
    const t3 = setTimeout(hideBranding, 3000)

    const script = document.createElement('script')
    script.type = 'module'
    script.defer = true
    script.innerHTML = `
      import Chatbot from "https://cdn.n8nchatui.com/v1/embed.js";
      Chatbot.init({
        "n8nChatUrl": "https://n8n.orbissolutions.ca/webhook/5ba0f854-d981-41b3-a37f-4b7ab3530a1d/chat",
        "metadata": {},
        "theme": {
          "button": {
            "iconColor": "#fff9f6",
            "backgroundColor": "#4169FF"
          },
          "chatWindow": {
            "borderRadiusStyle": "rounded",
            "avatarBorderRadius": 50,
            "messageBorderRadius": 6,
            "showTitle": true,
            "title": "Orbis Solutions ChatBot",
            "titleAvatarSrc": "https://cdn.corenexis.com/files/c/8289462720.png",
            "avatarSize": 43,
            "welcomeMessage": "Hi there! I can get you booked in for a free demo, or answer any questions you have about what we do. What can I help you with?",
            "errorMessage": "Sorry! Running into some technical issues. Please feel free to reach out to us directly at orbissolutions.ai@gmail.com.",
            "backgroundColor": "#ffffff",
            "height": 0,
            "width": 0,
            "fontSize": 18,
            "starterPrompts": [
              "I'd like to book a free live demo",
              "I have questions about Orbis' services"
            ],
            "starterPromptFontSize": 18,
            "renderHTML": false,
            "clearChatOnReload": true,
            "showScrollbar": true,
            "botMessage": {
              "backgroundColor": "#4169FF",
              "textColor": "#fafafa",
              "showAvatar": true,
              "avatarSrc": "https://cdn.corenexis.com/files/c/1119434720.png",
              "showCopyToClipboardIcon": false
            },
            "userMessage": {
              "backgroundColor": "#fff6f3",
              "textColor": "#050505",
              "showAvatar": false,
              "avatarSrc": "https://www.svgrepo.com/show/532363/user-alt-1.svg"
            },
            "textInput": {
              "placeholder": "Type your query",
              "backgroundColor": "#ffffff",
              "textColor": "#1e1e1f",
              "sendButtonColor": "#4169FF",
              "maxChars": 300,
              "maxCharsWarningMessage": "You exceeded the characters limit. Please input less than 300 characters.",
              "autoFocus": true,
              "borderRadius": 6,
              "sendButtonBorderRadius": 50
            }
          }
        }
      });
    `
    document.body.appendChild(script)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      observer.disconnect()
      if (document.body.contains(script)) document.body.removeChild(script)
    }
  }, [])

  return null
}
