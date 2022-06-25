import { isPast, format } from 'date-fns';
import { CheckCircle, Lock } from 'phosphor-react'
import ptPT from 'date-fns/locale/pt'
import { Link, useParams } from 'react-router-dom';
import classnames from 'classnames';

interface LessonProps {
    title: string;
    slug: string;
    availableAt: Date;
    type: 'live' | 'class';
}

export function Lesson(props: LessonProps) {
    const { slug } = useParams<{ slug: string }>()

    const isLessonAvailable = isPast(props.availableAt)
    const availableDateFormatted = format(props.availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
        locale: ptPT
    })

    const isActiveLesson = slug === props.slug;

    return (
        <Link to={`/event/lesson/${props.slug}`} className="group">
            <span className="text-gray-300">
                {availableDateFormatted}
            </span>

            <div
                className={classnames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500', {
                    'bg-green-500': isActiveLesson
                })}
            >
                <header className="flex items-center justify-between">
                    {
                        isLessonAvailable ? (
                            <span className={classnames('text-sm font-medium flex items-center gap-2', {
                                'text-white': isActiveLesson,
                                'text-blue-500': !isActiveLesson
                            })}>
                                <CheckCircle size={20} />

                                Conteúdo Liberado
                            </span>
                        ) : (
                            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                                <Lock size={20} />

                                Em breve
                            </span>
                        )
                    }
                    <span className="text-xs rounded px-2 py-[0.125rem] text-white border border-green-300 font-bold">
                        {props.type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
                    </span>
                </header>

                <strong className={classnames('mt-5 block', {
                    'text-white': isActiveLesson,
                    'text-gray-200': !isActiveLesson
                })}>
                    {props.title}
                </strong>
            </div>
        </Link>
    )
}