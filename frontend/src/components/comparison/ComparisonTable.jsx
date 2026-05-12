import './ComparisonTable.css';

export default function ComparisonTable({ data }) {
  if (!data || data.length === 0) return null;

  const universities = data.map((d) => d.university);
  const allSemesters = [...new Set(data.flatMap((d) => d.courses.map((c) => c.semester)))].sort((a, b) => a - b);

  return (
    <div className="comparison-table-wrapper">
      <table className="comparison-table">
        <thead>
          <tr>
            <th>Ciclo</th>
            {universities.map((u) => <th key={u.id}>{u.acronym || u.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {allSemesters.map((sem) => (
            <tr key={sem}>
              <td className="comparison-table__semester">Ciclo {sem}</td>
              {data.map((d) => {
                const courses = d.courses.filter((c) => c.semester === sem);
                return (
                  <td key={d.university.id}>
                    {courses.length > 0 ? (
                      <ul>
                        {courses.map((c) => (
                          <li key={c.id} title={`${c.credits} créditos`}>{c.course_name}</li>
                        ))}
                      </ul>
                    ) : <span className="comparison-table__empty">—</span>}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
