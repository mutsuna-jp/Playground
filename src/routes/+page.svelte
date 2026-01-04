<script lang="ts">
  /**
   * Playground Item Interface
   */
  import playgroundsData from "$lib/playgrounds.json";

  type PlaygroundItem = {
    title: string;
    description: string;
    url: string;
    source?: string;
    tags: string[];
    date: string;
  };

  const playgrounds: PlaygroundItem[] = playgroundsData;
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=DotGothic16&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="retro-background"></div>

<div class="page-wrapper pixel-theme">
  <header class="hero" style="animation-delay: 200ms;">
    <h1 class="title-pixel">Playground</h1>
    <p class="subtitle">
      実験、UIコンポーネント、インタラクティブなアイデアのコレクション。
    </p>
  </header>

  <main class="grid-container">
    {#each playgrounds as item, i}
      <div
        class="card"
        style="--delay: {400 + i * 100}ms"
        onmousemove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty(
            "--mouse-x",
            `${e.clientX - rect.left}px`,
          );
          e.currentTarget.style.setProperty(
            "--mouse-y",
            `${e.clientY - rect.top}px`,
          );
        }}
        role="article"
      >
        <a
          href={item.url}
          class="card-link-overlay"
          aria-label="View {item.title}"
        ></a>
        <div class="card-content">
          <div class="card-header">
            <h2>{item.title}</h2>
            <span class="date">{item.date}</span>
          </div>
          <p>{item.description}</p>

          <div class="tags">
            {#each item.tags as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        </div>
        <div class="card-footer">
          {#if item.source}
            <a
              href={item.source}
              class="source-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                ></path>
              </svg>
              Source
            </a>
          {/if}
          <span class="explore-text">Explore &rarr;</span>
        </div>
      </div>
    {/each}
  </main>
</div>

<style>
  :global(:root) {
    --pixel-border: 2px solid var(--text-secondary);
    --pixel-shadow: 4px 4px 0 0 var(--text-tertiary);
    --pixel-shadow-hover: 6px 6px 0 0 var(--accent-primary);
  }

  .page-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
  }

  /* Pixel Theme Overrides */
  .pixel-theme {
    font-family: "DotGothic16", monospace;
  }

  /* Custom Scrollbar */
  :global(::-webkit-scrollbar) {
    width: 12px;
    background: var(--bg-app);
  }

  :global(::-webkit-scrollbar-thumb) {
    background: var(--border-subtle);
    border: 2px solid var(--bg-app); /* Creates padding effect and blocky look */
    border-radius: 0;
  }

  :global(::-webkit-scrollbar-thumb:hover) {
    background: var(--text-secondary);
  }

  .retro-background {
    position: fixed;
    inset: 0;
    z-index: -1;
    background-color: var(--bg-app);
    background-size: 32px 32px;
    background-image: linear-gradient(
        to right,
        rgba(255, 255, 255, 0.03) 1px,
        transparent 1px
      ),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    pointer-events: none;
  }

  /* Scanlines */
  .retro-background::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0) 50%,
      rgba(0, 0, 0, 0.2) 50%,
      rgba(0, 0, 0, 0.2)
    );
    background-size: 100% 4px;
    pointer-events: none;
    z-index: 1;
  }

  /* Vignette */
  .retro-background::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at center,
      transparent 30%,
      rgba(0, 0, 0, 0.7) 100%
    );
    z-index: 2;
  }

  .hero {
    margin-bottom: 4rem;
    text-align: left;
    opacity: 0;
    animation: fly-in-down 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  .title-pixel {
    font-size: 3.5rem;
    font-weight: 400;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    text-shadow: 4px 4px 0 var(--accent-secondary);
    position: relative;
    display: inline-block;
  }

  .title-pixel:hover {
    animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
    color: var(--text-primary);
  }

  @keyframes fly-in-down {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fly-in-up {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes glitch {
    0% {
      transform: translate(0);
      text-shadow: 4px 4px 0 var(--accent-secondary);
    }
    20% {
      transform: translate(-2px, 2px);
      text-shadow: 4px 4px 0 var(--accent-highlight);
    }
    40% {
      transform: translate(-2px, -2px);
      text-shadow: 4px 4px 0 var(--accent-secondary);
    }
    60% {
      transform: translate(2px, 2px);
      text-shadow: 4px 4px 0 var(--accent-highlight);
    }
    80% {
      transform: translate(2px, -2px);
      text-shadow: 4px 4px 0 var(--accent-secondary);
    }
    100% {
      transform: translate(0);
      text-shadow: 4px 4px 0 var(--accent-highlight);
    }
  }

  .subtitle {
    font-size: 1.25rem;
    color: var(--text-secondary);
    max-width: 600px;
    line-height: 1.8;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
    justify-content: center;
  }

  .card {
    display: flex;
    flex-direction: column;
    background: var(--bg-panel);
    border: 2px solid var(--text-secondary); /* Pixel style border */
    border-radius: 0; /* No rounding */
    padding: 2rem;
    transition: all 0.2s steps(4); /* Stepped transition for retro feel */
    position: relative;
    overflow: hidden;
    height: 100%;
    justify-content: space-between;
    box-shadow: var(--pixel-shadow);
    opacity: 0;
    animation: fly-in-up 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    animation-delay: var(--delay, 0ms);
  }

  .card-link-overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
  }

  /* Scanline effect or similar could go here, but keeping it simple for now */
  .card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(255, 255, 255, 0.05),
      transparent 40%
    );
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
    z-index: 0;
  }

  .card:hover {
    transform: translate(-2px, -2px);
    border-color: var(--accent-primary);
    box-shadow: var(--pixel-shadow-hover);
  }

  .card:hover::before {
    opacity: 1;
  }

  .card-content {
    margin-bottom: 2rem;
    position: relative;
    z-index: 0;
    pointer-events: none;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 1rem;
  }

  .card h2 {
    font-size: 1.5rem;
    font-weight: 400;
    color: var(--text-primary);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .date {
    font-size: 0.875rem;
    color: var(--text-tertiary);
    font-family: "DotGothic16", monospace;
  }

  .card p {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    line-height: 1.6;
    font-size: 1rem;
  }

  .tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .tag {
    font-size: 0.75rem;
    padding: 0.25rem 0.75rem;
    border-radius: 0; /* No round */
    background: var(--bg-app);
    color: var(--text-secondary);
    border: 1px solid var(--text-tertiary);
    text-transform: uppercase;
    box-shadow: 2px 2px 0 0 var(--border-subtle);
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    position: relative;
    z-index: 2;
    pointer-events: none;
  }

  .source-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary);
    font-size: 0.875rem;
    text-decoration: none;
    transition: color 0.2s;
    pointer-events: auto;
  }

  .source-link:hover {
    color: var(--accent-primary);
    text-decoration: underline;
    text-decoration-thickness: 2px;
  }

  .explore-text {
    color: var(--accent-primary);
    font-weight: 600;
    font-size: 0.9rem;
    opacity: 0.8;
    transition:
      opacity 0.2s,
      transform 0.2s;
    display: inline-block;
    margin-left: auto;
  }

  .card:hover .explore-text {
    opacity: 1;
    transform: translateX(4px);
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 640px) {
    .page-wrapper {
      padding: 4rem 1rem;
    }

    .grid-container {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .title-pixel {
      font-size: 2.5rem;
    }
  }
</style>
