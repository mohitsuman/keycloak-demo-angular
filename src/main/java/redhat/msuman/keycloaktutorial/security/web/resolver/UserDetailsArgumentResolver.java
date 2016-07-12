package redhat.msuman.keycloaktutorial.security.web.resolver;

import org.keycloak.KeycloakPrincipal;
import org.keycloak.adapters.RefreshableKeycloakSecurityContext;
import org.keycloak.representations.AccessToken;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebArgumentResolver;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import redhat.msuman.keycloaktutorial.security.domain.CurrentUser;
import redhat.msuman.keycloaktutorial.security.domain.UserDetails;

public class UserDetailsArgumentResolver implements HandlerMethodArgumentResolver {

	@Override
	public Object resolveArgument(MethodParameter methodParameter, ModelAndViewContainer mavContainer,
			NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {

		if (supportsParameter(methodParameter)) {
			return createUserDetails(webRequest);
		}
		else {
			return WebArgumentResolver.UNRESOLVED;
		}
	}

	@SuppressWarnings("unchecked")
	private Object createUserDetails(NativeWebRequest webRequest) {
		KeycloakPrincipal<RefreshableKeycloakSecurityContext> principal =
				(KeycloakPrincipal<RefreshableKeycloakSecurityContext>) webRequest.getUserPrincipal();

		AccessToken token = principal.getKeycloakSecurityContext().getToken();

		return new UserDetails(token.getId(), token.getGivenName(), token.getFamilyName(), token.getEmail(),
				token.getRealmAccess().getRoles());
	}

	@Override
	public boolean supportsParameter(MethodParameter methodParameter) {
		return methodParameter.getParameterAnnotation(CurrentUser.class) != null
				&& methodParameter.getParameterType().equals(UserDetails.class);
	}

}
