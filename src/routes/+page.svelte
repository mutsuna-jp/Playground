<script lang="ts">
  /**
   * Playground Item Interface
   */
  import playgroundsData from "$lib/playgrounds.json";

  type PlaygroundItem = {
    id: string;
    title: string;
    description: string;
    path: string;
    tags: string[];
    date: string;
    destination?: string;
  };

  const playgrounds: PlaygroundItem[] = playgroundsData;
</script>

<div class="page-wrapper">
  <header class="hero">
    <h1 class="title-gradient">Playground</h1>
    <p class="subtitle">
      A collection of experiments, UI components, and interactive ideas.
    </p>
  </header>

  <main class="grid-container">
    {#each playgrounds as item}
      <a
        href={item.path}
        class="card"
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
      >
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
          <span class="explore-text">Explore &rarr;</span>
        </div>
      </a>
    {/each}
  </main>
</div>

<style>
  .page-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
  }

  .hero {
    margin-bottom: 4rem;
    text-align: left;
  }

  h1 {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }

  .subtitle {
    font-size: 1.25rem;
    color: var(--text-secondary);
    max-width: 600px;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
  }

  .card {
    display: flex;
    flex-direction: column;
    background: var(--bg-panel);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    padding: 2rem;
    transition: all 0.3s var(--ease-out);
    position: relative;
    overflow: hidden;
    height: 100%;
    justify-content: space-between;
  }

  .card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(255, 255, 255, 0.03),
      transparent 40%
    );
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }

  .card:hover {
    transform: translateY(-4px);
    border-color: var(--border-focus);
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
  }

  .card:hover::before {
    opacity: 1;
  }

  .card-content {
    margin-bottom: 2rem;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 1rem;
  }

  .card h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
  }

  .date {
    font-size: 0.875rem;
    color: var(--text-tertiary);
    font-family: monospace;
  }

  .card p {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  .tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .tag {
    font-size: 0.75rem;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    background: var(--bg-app);
    color: var(--text-secondary);
    border: 1px solid var(--border-subtle);
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
  }

  .card:hover .explore-text {
    opacity: 1;
    transform: translateX(4px);
  }
</style>
