package onlinevoting.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import onlinevoting.entity.Party;
import onlinevoting.entity.User;
// curd (insert update delete) , jpa also does (sorting searching and paging (redirecting to different url) )
// jpa uses <entity, datatype>
public interface UserRepository extends JpaRepository<User, Long> {
	
	User  findByUserEmailAndUserPassword(String userEmail, String userPassword);

	User  findByUserVotingCardNumberAndUserPassword(String userVotingCardNumber, String userPassword);

	User findByUserVotingCardNumber(String userVotingCardNumber);

	List<User> findByUserMobileNumber(String userMobileNumber);

	List<User> findByUserName(String userName);

	List<User> findByUserRole(String userRole);
	
	User  findByUserEmail(String userEmail);
}
