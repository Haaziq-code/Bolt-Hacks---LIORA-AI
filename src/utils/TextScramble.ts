export class TextScramble {
  private el: HTMLElement;
  private chars: string = '!<>-_\\/[]{}—=+*^?#________';
  private queue: Array<{
    from: string;
    to: string;
    start: number;
    end: number;
    char?: string;
  }> = [];
  private frame: number = 0;
  private frameRequest?: number;
  private resolve?: () => void;

  constructor(el: HTMLElement) {
    this.el = el;
  }

  setText(newText: string): Promise<void> {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    
    return new Promise((resolve) => {
      this.resolve = resolve;
      this.queue = [];
      
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        // Faster, more synchronized timing
        const start = Math.floor(Math.random() * 15); // Reduced from 40
        const end = start + Math.floor(Math.random() * 20); // Reduced from 40
        this.queue.push({ from, to, start, end });
      }
      
      if (this.frameRequest) {
        cancelAnimationFrame(this.frameRequest);
      }
      
      this.frame = 0;
      this.update();
    });
  }

  private update = (): void => {
    let output = '';
    let complete = 0;
    
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.4) { // Increased from 0.28 for more scrambling
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += char;
      } else {
        output += from;
      }
    }
    
    this.el.innerHTML = output;
    
    if (complete === this.queue.length) {
      if (this.resolve) {
        this.resolve();
      }
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  };

  private randomChar(): string {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}