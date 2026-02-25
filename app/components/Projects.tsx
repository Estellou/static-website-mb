import { Link } from 'react-router-dom'

interface Project {
  img: { src: string; alt: string }
  title: string
  link: string
}

interface ProjectsProps {
  title: string
  projects: Project[]
}

export default function Projects({ title, projects }: ProjectsProps) {
  return (
    <section className="w-full px-6 py-20 md:px-16 lg:px-24">
      <h3 className="text-3xl font-bold text-black mb-12">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project, index) => (
          <Link key={index} to={project.link} className="group flex flex-col gap-3">
            {project.img.src ? (
              <img
                src={project.img.src}
                alt={project.img.alt}
                className="w-full aspect-[4/3] object-cover transition-opacity group-hover:opacity-80"
              />
            ) : (
              <div className="w-full aspect-[4/3] bg-gray-100 transition-opacity group-hover:opacity-80" />
            )}
            <h4 className="text-sm font-medium text-black uppercase tracking-wide group-hover:underline">
              {project.title}
            </h4>
          </Link>
        ))}
      </div>
    </section>
  )
}
