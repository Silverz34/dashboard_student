import Card from "../../components/card";
export default function Home() {
  const reports = [
    { id: 1, title: 'Rendimiento por curso', description: 'lista de cursos con acantidad de alumnos reprobados', link: '/reports/1' },
    { id: 2, title: 'Carga de trabajo por profesor ', description: 'lista de maestros con su carga de alumnos y desempeño de sus alumnos', link: '/reports/2' },
    { id: 3, title: 'alumnos en riesgo académico', description: 'suarios que han realizado mas compras', link: '/reports/3'},
    { id: 4, title: 'asistencia promedio por grupo ', description: 'lista de grupos con su asistencia promedio', link: '/reports/4'},
    { id: 5, title: 'cuadro de honor', description: 'ranking de estudiantes con mejor desempeño', link: '/reports/5'},
  ];
  return (
    <div className="p-6 m-12"> 
      <section className="mb-8"> 
      <p className="text-gray-600">
        El siguiente dashboard presenta una serie de reportes que ofrecen información valiosa sobre 
        el rendimiento académico, la carga de trabajo de los profesores, los estudiantes en riesgo académico, la asistencia promedio por grupo y el cuadro de honor. 
        Estos reportes están diseñados para ayudar a los administradores, profesores y estudiantes a tomar decisiones informadas y mejorar el desempeño académico en general.
      </p> 
      </section>
      <br></br>
      <section> 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"> 
          {reports.map((report) => ( <Card key={report.id} report={report}/> ))} 
        </div> 
      </section> 
    </div>
  );
}
