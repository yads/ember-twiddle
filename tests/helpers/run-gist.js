import { isArray } from '@ember/array';
import { visit } from '@ember/test-helpers';
import createGist from "./create-gist";
import waitForLoadedIFrame from './wait-for-loaded-iframe';

export default async function(options = {}) {
  createGist(options);

  if (isArray(options)) {
    options = { files: options };
  }

  const gist_id = options.gist_id || "35de43cb81fc35ddffb2";
  const commit = options.commit || "f354c6698b02fe3243656c8dc5aa0303cc7ae81c";
  const initialRoute = options.initialRoute || "/";
  const isGitRevision = options.type === "revision";

  let url = "/" + gist_id;
  if (isGitRevision) {
    url += "/" + commit;
  }
  if (initialRoute !== "/") {
    url += "?route=" + initialRoute;
  }

  await visit(url);

  return await waitForLoadedIFrame(initialRoute);
}
