import { Link, useMatches } from "react-router-dom";
import classes from './breadcrumbs.module.css'

function Breadcrumbs() {
    let matches = useMatches();

    let crumbs = matches
      .filter((match) => Boolean(match.handle?.crumb))
      .map((match) => match.handle.crumb(match.data));
  
    return (
      <ul className={classes.crumb}>
        {crumbs.map((crumb, index) => (
            <li key={index}>
                {index !== 0 && <span>&nbsp;/&nbsp;</span>}
                {(index !== (crumbs.length - 1)) ? <Link to={matches[index].pathname}>{crumb}</Link> 
                    :
                <span>{crumb}</span>
                }
            </li>
        ))}
      </ul>
    );
  }

  export default Breadcrumbs