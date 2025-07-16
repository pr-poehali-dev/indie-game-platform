import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface TypewriterTextProps {
  text: string;
  speed?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, speed = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return <span>{displayText}</span>;
};

export default function Index() {
  const [terminalLines, setTerminalLines] = useState([
    { text: "SYSTEM INITIALIZATION...", delay: 0 },
    { text: "LOADING GAME PORTFOLIO...", delay: 1000 },
    { text: "ACCESS GRANTED", delay: 2000 },
    { text: "WELCOME, ENTITY", delay: 3000 }
  ]);

  const games = [
    {
      id: "SCP-001",
      title: "DARK FACILITY",
      description: "Исследуйте заброшенную исследовательскую станцию. Что-то пошло не так в Секторе-7...",
      status: "ЗАВЕРШЕНО",
      image: "/img/b7b6cba0-b841-406b-86ef-2805d585f645.jpg",
      tags: ["ХОРРОР", "ВЫЖИВАНИЕ", "РЕТРО"]
    },
    {
      id: "SCP-002", 
      title: "TERMINAL BREACH",
      description: "Системный сбой в терминальной сети. Ваша задача - восстановить контроль.",
      status: "В РАЗРАБОТКЕ",
      image: "/img/80ff7624-1653-4f98-8553-a92a5210e016.jpg",
      tags: ["КИБЕРПАНК", "ГОЛОВОЛОМКА", "ТЕРМИНАЛ"]
    },
    {
      id: "SCP-003",
      title: "SHADOW PROTOCOL", 
      description: "Классифицированная операция. Уровень допуска: СТРОГО СЕКРЕТНО.",
      status: "АНОНСИРОВАНО",
      image: "/img/0f0a549e-1250-4f35-bceb-5c3d3daaa7c5.jpg",
      tags: ["СТЕЛС", "АТМОСФЕРА", "МИСТИКА"]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Terminal Header */}
      <div className="border-b border-primary/30 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="terminal-text text-xl font-bold">
              <span className="text-primary">█</span> INDIE_GAMES_PORTFOLIO.EXE
            </div>
            <div className="terminal-text text-sm">
              {new Date().toLocaleString('ru-RU')} | STATUS: ONLINE
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-8 space-y-4">
            <div className="terminal-text text-sm mb-4">
              {terminalLines.map((line, index) => (
                <div key={index} className="opacity-80">
                  > <TypewriterText text={line.text} speed={30} />
                </div>
              ))}
            </div>
            
            <h1 className="text-6xl font-bold mb-6 glitch-text" data-text="HORROR GAMES">
              <span className="text-primary">HORROR</span> GAMES
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-mono">
              СОЗДАЮ АТМОСФЕРНЫЕ ИНДИ-ИГРЫ В СТИЛЕ SCP FOUNDATION. 
              ИССЛЕДУЙТЕ НЕИЗВЕСТНОЕ. ВЫЖИВИТЕ В УЖАСЕ.
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Button size="lg" className="font-mono">
              <Icon name="Gamepad2" className="mr-2" size={20} />
              ПРОСМОТРЕТЬ ИГРЫ
            </Button>
            <Button variant="outline" size="lg" className="font-mono">
              <Icon name="FileText" className="mr-2" size={20} />
              ЧИТАТЬ БЛОГ
            </Button>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="py-16 px-4 bg-card/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 terminal-text">
              <span className="text-primary">█</span> АКТИВНЫЕ ПРОЕКТЫ
            </h2>
            <p className="text-muted-foreground font-mono">
              КЛАССИФИЦИРОВАННЫЕ РАЗРАБОТКИ
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <Card key={game.id} className="bg-card/80 border-primary/30 hover:border-primary/60 transition-all duration-300 hover:scale-105">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img 
                    src={game.image} 
                    alt={game.title}
                    className="w-full h-full object-cover filter brightness-75 hover:brightness-90 transition-all"
                  />
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="font-mono text-xs">
                      {game.id}
                    </Badge>
                    <Badge 
                      variant={game.status === "ЗАВЕРШЕНО" ? "default" : "secondary"}
                      className="font-mono text-xs"
                    >
                      {game.status}
                    </Badge>
                  </div>
                  
                  <CardTitle className="font-mono text-xl">{game.title}</CardTitle>
                  <CardDescription className="font-mono text-sm">
                    {game.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {game.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs font-mono">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button className="w-full font-mono" variant="outline">
                    <Icon name="Eye" className="mr-2" size={16} />
                    ПОДРОБНЕЕ
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 terminal-text">
              <span className="text-primary">█</span> ЖУРНАЛ РАЗРАБОТКИ
            </h2>
            <p className="text-muted-foreground font-mono">
              ЗАПИСИ ИЗ ЛОГОВ СИСТЕМЫ
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                date: "2024.07.15",
                title: "СИСТЕМА УЖАСА: КАК СОЗДАТЬ АТМОСФЕРУ",
                excerpt: "Разбираю технические аспекты создания напряжения в хоррор-играх...",
                tags: ["ГЕЙМДИЗАЙН", "УЖАС", "АТМОСФЕРА"]
              },
              {
                date: "2024.07.10", 
                title: "ПИКСЕЛЬ-АРТ В СТИЛЕ SCP",
                excerpt: "Создание визуального стиля для ретро-хоррор проектов...",
                tags: ["АРТЫ", "ПИКСЕЛИ", "SCP"]
              },
              {
                date: "2024.07.05",
                title: "SOUND DESIGN ДЛЯ ИНДИ-ХОРРОРА",
                excerpt: "Как создать пугающие звуковые эффекты с минимальным бюджетом...",
                tags: ["ЗВУК", "ХОРРОР", "ИНДИ"]
              }
            ].map((post, index) => (
              <Card key={index} className="bg-card/50 border-primary/20 hover:border-primary/40 transition-all">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="outline" className="font-mono text-xs">
                      {post.date}
                    </Badge>
                    <div className="flex gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs font-mono">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 font-mono">{post.title}</h3>
                  <p className="text-muted-foreground font-mono mb-4">{post.excerpt}</p>
                  
                  <Button variant="ghost" className="font-mono">
                    <Icon name="ArrowRight" className="mr-2" size={16} />
                    ЧИТАТЬ ПОЛНОСТЬЮ
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-card/20">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold mb-6 terminal-text">
            <span className="text-primary">█</span> СВЯЗЬ
          </h2>
          
          <div className="bg-card/50 border border-primary/30 rounded-lg p-8 font-mono">
            <div className="space-y-4 text-left">
              <div className="terminal-text">
                > СТАТУС: ДОСТУПЕН ДЛЯ СОТРУДНИЧЕСТВА
              </div>
              <div className="terminal-text">
                > EMAIL: [CLASSIFIED]@horror-games.dev
              </div>
              <div className="terminal-text">
                > DISCORD: Entity#0001
              </div>
              <div className="terminal-text">
                > РЕЖИМ РАБОТЫ: 24/7 [АВТОНОМНЫЙ]
              </div>
            </div>
            
            <div className="mt-8 flex gap-4 justify-center">
              <Button className="font-mono">
                <Icon name="Mail" className="mr-2" size={16} />
                НАПИСАТЬ
              </Button>
              <Button variant="outline" className="font-mono">
                <Icon name="Github" className="mr-2" size={16} />
                GITHUB
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/30 py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="terminal-text text-sm space-y-2">
            <div>© 2024 HORROR GAMES PORTFOLIO | КЛАССИФИКАЦИЯ: ОБЩЕДОСТУПНО</div>
            <div className="text-muted-foreground">
              СОЗДАНО С ИСПОЛЬЗОВАНИЕМ АНОМАЛЬНЫХ ТЕХНОЛОГИЙ
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}