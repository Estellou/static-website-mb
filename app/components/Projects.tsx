interface Project {
  img: { src: string; alt: string }
  title: string
}

interface ProjectsProps {
  title: string
  projects: Project[]
}

export default function Projects({ title, projects }: ProjectsProps) {
  return (
    <section className="w-full px-6 pt-20 pb-10 md:py-20 md:px-16 lg:px-24">
      <h2 className="text-3xl font-bold text-black mb-12">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="flex flex-col gap-3">
            {project.img.src ? (
              <img
                src={project.img.src}
                alt={project.img.alt}
                className="w-full aspect-[4/3] object-cover"
              />
            ) : (
              <div className="w-full aspect-[4/3] bg-gray-100" />
            )}
            <h3 className="text-sm font-medium text-black uppercase tracking-wide">
              {project.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  )
}
